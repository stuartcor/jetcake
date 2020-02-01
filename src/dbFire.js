const firebase = require('firebase');

require("firebase/auth");
require("firebase/firestore");
require('firebase/firebase-database');

let firebaseConfig = {
    apiKey: "AIzaSyDONP_UTDiXTW_TWEM5CwxM5IzNyfzal8I",
    authDomain: "jetcake-8bc95.firebaseapp.com",
    databaseURL: "https://jetcake-8bc95.firebaseio.com",
    projectId: "jetcake-8bc95",
    storageBucket: "jetcake-8bc95.appspot.com",
    messagingSenderId: "472098652579",
    appId: "1:472098652579:web:5d467b7b11a6196ae41a16"
};

class fireApp {
    constructor(){
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.db = firebase.database();
        this.store = firebase.firestore();
    }


    // SESSION METHODS AND FUNCTIONS 
    async register(userInfo) {
        return new Promise((resolve, reject) => {
            this.auth.createUserWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
                .then(async result => {
                   let authCreated = await this.addUser(userInfo, result.user.uid)
                   resolve({userID: authCreated.id, user: result.user})
                })
                .catch(err => reject(err))
        })
    }

    async logIn(userInfo) {
        return new Promise((resolve, reject) => {
            this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(()=>{
                this.auth.signInWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
                    .then(async result => {                    
                       resolve(result.user)
                    })
                    .catch(err => reject(err))

            })
            .catch(err=>resolve(err));
        })
    }

    signOut() {
        return new Promise((resolve, reject) => {
            this.auth.signOut().then(result=> {
                resolve({ok: true, state: 'Success'})
            })
            .catch(err => reject(err));

        })
    }

    checkUser() {
      return  this.auth.currentUser;
    }

    //ADD DATA TO FIRESTORE

    async addUser(userInfo, authID) {
        const user = {
            authID: authID,
            address: '',
            dateBirth: userInfo.userBirth,
            name: userInfo.userName,
            lastName: userInfo.userLastName,
            phoneNumber: '',
            photo: '',
        }
        return new Promise((resolve, reject) => {
            this.store.collection('Users').add(user).then(async createdUser =>{
                let addedQ = await this.addQuestions(userInfo, createdUser.id);
                if(addedQ==='Success'){
                    resolve(createdUser);
                }
            }).catch(err => reject(err));


        })
        


    }

    async addQuestions(userInfo, userID) {
        let firstQuestion = {
            answer: userInfo.ansFirst,
            questionID: userInfo.sqFirst,
            userID
        }
        let secondQuestion = {
            answer: userInfo.ansSecond,
            questionID: userInfo.sqSecond,
            userID
        }
        let thirdQuestion = {
            answer: userInfo.ansThird,
            questionID: userInfo.sqThird,
            userID
        }
        return new Promise((resolve, reject) => {
            Promise.all(
                [this.store.collection('usersQuestions').add(firstQuestion),
                this.store.collection('usersQuestions').add(secondQuestion),
                this.store.collection('usersQuestions').add(thirdQuestion)]
            ).then(result => {
                resolve('Success')
            })
            .catch(err => reject(err));

        })
    }

    //GET DATA FROM FIRESTORE
    async getQuestions(){
        return new Promise((resolve, reject) =>{
            this.store.collection('questions').get()
            .then((snap) => {
                let dataArray = [];
                snap.forEach((data) => {
                    dataArray.push({id: data.id, question: data.data().question})
                })                
                resolve(dataArray)
            })
        })
    }

    async getAnswerByID(id){
        return new Promise((resolve, reject) => {
            this.store.collection('questions').doc(id).get()
            .then(result => {
                resolve(result.data().question);
            })
            .catch(err => reject(err));
        })

    } 

    async getUserAllInfo(id){
        let user = await this.getUserByAuthId(id);
        let answers = [];  //Array to store security questions from user
        let countAnswer = 0; //Counter to return values in promise 
        return new Promise((resolve, reject) => {
            this.store.collection('usersQuestions').where('userID', '==', user.id)
            .get()
            .then(async (snap) =>{
                snap.forEach(async (data) =>{
                    let answer = data.data();
                    let question = await this.getAnswerByID(answer.questionID);
                    answers.push({answer: answer.answer, question});
                    countAnswer++;
                    //If counter is iqual to documents retrive from firestore 
                    //then resolve the promise whit data
                    if(countAnswer == snap.docs.length){
                        resolve({...user, answers});
                    }
                })
            })
        })
    }
    

    async getUserByAuthId(id){
        return new Promise((resolve, reject) => {
            this.store.collection('Users').where('authID', '==', id)
            .get()
            .then(documents => {
                let user ={...documents.docs[0].data(), id: documents.docs[0].id};
                resolve(user)
            })

        })
    }

    

    //UPDATE USERS

    async updateUser(id, user) {
        let userFound = await this.getUserByAuthId(id);
        this.store.collection('Users').doc(userFound.id).update(user);
    }


}

export  default new fireApp();