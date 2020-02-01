import React, { Component} from 'react'
import { IonPage, IonGrid, IonRow, IonCol, IonInput, IonItem, IonLabel, IonButton, IonDatetime, IonCard, IonCardHeader, IonTitle, IonCardContent, IonSelect, IonSelectOption, IonLoading, IonAlert } from '@ionic/react'

import fireApp from '../../dbFire'; //Import new Instance of Firebase 

import NavBar from '../Layout/NavBar'; //Import componets 
import Footer from '../Layout/Footer'; //Import componets

import './SignUp.css'
import { Redirect} from 'react-router';


let user = {}; //To save user data from inputs
let messageAlert = ''; //To Show alerts when necessary

//Use to Render links into NavBar
let toShow = [
    {
      path: '/', 
      name: 'Home'
    },
    {
      path: '/Login', 
      name: 'Log In!'
    }
  ]

class SignUpPage extends Component {
    
    state = {
        isLogged: false,
        showLoading: false,
        securityQ: [],
        showAlert: false,
    }


    //Retrive Data from Firestore then update the state to render when data is available 
    componentWillMount() {
        let {securityQ} = this.state 
        fireApp.getQuestions().then((data: any) => {
            securityQ = data;
            this.setState({...this.state, securityQ});
        });
    }
    
    render() {
            //SUBMIT FORM TO REGISTER USER
            const SubmitForm = (evt: any) => {
                evt.stopPropagation();
                evt.preventDefault();
                this.setState({...this.state, showLoading: true}) //Change Variable to show loading on screen
                fireApp.register(user)
                    .then(success => {
                        //If user was create set isLogged to true to render component
                        if(success.userID){
                            this.setState({...this.state, isLogged: true})
                        } 
                    })
                    .catch( err => {
                        //If an error ocurred show an alert on screeen
                        messageAlert = err.message;
                        this.setState({...this.state, showAlert: true, showLoading: false})
                    })
                  
            }

            //Event created to handle data from inputs, gets the name of the input and assigned to user object
            const HandleData = (evt: any) =>{
                    Object.defineProperty(user, evt.target.name, {
                        value: evt.target.value,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });              
            } 

        //Retriving is Logged from state to render when logged  
        let {isLogged} = this.state;
        
        if (isLogged) {
            return <Redirect to='/Profile'/>;
        }
        
        return(
            <>
                <NavBar toShow={toShow}></NavBar>
                <IonAlert
                    isOpen={this.state.showAlert}
                    onDidDismiss={() => this.setState({...this.state, showAlert: false})}
                    header={'Error!'}
                    subHeader={'An Error Ocurred'}
                    message={messageAlert}
                    buttons={['OK']}
                    />
                <div className="img-bg-s">
                    <br/>
                    <div className="title">
                        <h1>Sign Up For Free!</h1>
                    </div>
                    <br/>
                    <IonLoading
                        isOpen={this.state.showLoading}
                        message={'Loading...'}
                        duration={90000}
                    />
                <form onSubmit={SubmitForm} >
                    <IonGrid>
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-sm="6">
                                <IonItem className="item-s">
                                    <IonLabel position="floating">Name *</IonLabel>                                    
                                    <IonInput clearInput required name='userName' onInput={HandleData}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-sm="6">
                                <IonItem className="item-s">
                                    <IonLabel position="floating">Last Name *</IonLabel>                                    
                                    <IonInput clearInput required name='userLastName' onInput={HandleData}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-sm="6">
                                <IonItem className="item-s">
                                    <IonLabel position="floating">Email *</IonLabel>                                    
                                    <IonInput type="email" clearInput required name='userEmail' onInput={HandleData}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-sm="6">
                                <IonItem className="item-s">
                                    <IonLabel position="floating">Password *</IonLabel>                                    
                                    <IonInput type="password" clearInput required name='userPassword' onInput={HandleData}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                                                
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-sm="6">
                                <IonItem className="item-s">
                                    <IonLabel position="floating">Date of Birth</IonLabel>
                                    <IonDatetime displayFormat="MM/DD/YY" name='userBirth' onIonChange={HandleData}></IonDatetime>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" sizeSm="6">
                                <IonCard className="card-bg-s">
                                    <IonCardHeader>
                                        <IonTitle>Security Question (Please Answer All)</IonTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <IonRow>
                                            <IonCol>
                                                <IonSelect interface="action-sheet" placeholder="First Question" name='sqFirst' onIonChange={HandleData}>
                                                { this.state.securityQ == undefined ? null : this.state.securityQ.map( (data: any) => {
                                                        return <IonSelectOption value={data.id} key={data.id}>{data.question}</IonSelectOption>
                                                    })}
                                                </IonSelect>
                                                <IonItem className="item-s">
                                                    <IonInput required name='ansFirst' onInput={HandleData}></IonInput>
                                                </IonItem>
                                            </IonCol>
                                        </IonRow>
                                        <br/>
                                        <IonRow>
                                            <IonCol>                                                
                                                <IonSelect interface="action-sheet" placeholder="Second Question" name='sqSecond' onIonChange={HandleData}>
                                                { this.state.securityQ == undefined ? null : this.state.securityQ.map( (data: any) => {
                                                        return <IonSelectOption value={data.id} key={data.id}>{data.question}</IonSelectOption>
                                                    })}
                                                </IonSelect>
                                                <IonItem className="item-s">
                                                    <IonInput required name='ansSecond' onInput={HandleData}></IonInput>
                                                </IonItem>
                                            </IonCol>
                                        </IonRow>
                                        <br/>
                                        <IonRow>
                                            <IonCol>                                                
                                                <IonSelect interface="action-sheet" placeholder="Third Question" name='sqThird' onIonChange={HandleData}>
                                                    { this.state.securityQ == undefined ? null : this.state.securityQ.map( (data: any) => {
                                                        return <IonSelectOption value={data.id} key={data.id}>{data.question}</IonSelectOption>
                                                    })}
                                                </IonSelect>
                                                <IonItem className="item-s">
                                                    <IonInput required name='ansThird' onInput={HandleData}></IonInput>
                                                </IonItem>
                                            </IonCol>
                                        </IonRow>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="12" size-sm="6">
                                <IonButton shape="round" fill="outline"  color="light" type="submit" expand="block">Register</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                </form>

                </div>
                
                <Footer></Footer>
            </>
        )
    }
}

export default SignUpPage;