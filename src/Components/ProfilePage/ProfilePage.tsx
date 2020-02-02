import React, { Component } from 'react';
import fireApp from '../../dbFire';

import Menu from '../Layout/Menu';
import Footer from '../Layout/Footer';


import { IonGrid, IonRow, IonCol, IonItem, IonImg, IonLabel, IonInput, IonTextarea, IonDatetime } from '@ionic/react';
import firebase from 'firebase';

let isUser: any; //Use to save data from auth
let unsubscribe: any; //use to save method to kill process of listening on changes, firebase.

class ProfilePage extends Component {

    state = {
        user: {
            name: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            dateBirth: '',
            photo: '',

        }
    }

    //Retrive Data from Firestore then update the state to render when data is available 
    componentWillMount(){
        isUser = fireApp.checkUser();
        if(isUser){
            //Use an instance of firebase to Listening on real time changes
             let query = firebase.firestore().collection('Users').where('authID', '==', isUser.uid);

             //Save the snapshot to unsubscribe it when component is destroyed
             unsubscribe =  query.onSnapshot(documents => {
                let user = documents.docs[0].data();
                this.setState({user: {email: isUser.email, ...user}});
            })
        }
        
    }

    componentWillUnmount(){
        unsubscribe(); //When leaving the component unsubscribe for fill process of listenig for changes
    } 

    render(){
        let imgShow = this.state.user.photo === '' ? 
            <IonImg className="user-no-profile"></IonImg>
        : 
            <div className="circle">
                <img  src={this.state.user.photo} className="image"></img>;
            </div>


        return(
            <>
                <Menu photo={this.state.user.photo}></Menu>
                <section className="img-bg-l">
                    <IonGrid>
                        <IonRow className="ion-justify-content-center">
                            <IonCol></IonCol>
                            <IonCol size="6" sizeSm="2" className="ion-align-self-center ">                                
                                {imgShow}
                            </IonCol>                            
                            <IonCol></IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol>
                                <IonItem className="item-s">
                                    <IonLabel position="floating">Name</IonLabel>                                    
                                    <IonInput type="email" readonly name='name' value={this.state.user.name}></IonInput>
                                </IonItem>
                            </IonCol>
                            
                            <IonCol>
                                <IonItem className="item-s">
                                    <IonLabel position="floating">Last Name</IonLabel>                                    
                                    <IonInput type="email" readonly name='lastName' value={this.state.user.lastName}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol>
                                <IonItem className="item-s">
                                    <IonLabel position="floating">Email</IonLabel>                                    
                                    <IonInput type="email" readonly name='email' value={this.state.user.email}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol>
                                <IonItem className="item-s">
                                    <IonLabel position="floating">Phone Number</IonLabel>                                    
                                    <IonInput type="email" readonly name='phoneNumber' value={this.state.user.phoneNumber}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol>
                                <IonItem className="item-s">
                                    <IonLabel position="floating">Address</IonLabel>                                    
                                    <IonTextarea autoGrow readonly name='address' value={this.state.user.address}></IonTextarea>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-justify-content-center">
                            <IonCol>
                                <IonItem className="item-s">
                                    <IonLabel position="floating">Date of Birth</IonLabel>
                                    <IonDatetime readonly displayFormat="MM/DD/YY" name='dateBirth' value={this.state.user.dateBirth}></IonDatetime>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                </section>
                <Footer></Footer>
            </>
        )
    }
}

export default ProfilePage;