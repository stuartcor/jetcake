import React, { Component } from 'react'

import { IonLoading, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonAlert } from '@ionic/react';

import fireApp from '../../dbFire'; //Import new Instance of Firebase 

import NavBar from '../Layout/NavBar'; //Import componets 
import Footer from '../Layout/Footer'; //Import componets 

import { Redirect } from 'react-router';

let user = {}; //To save user data from inputs
let messageAlert = ''; //To Show alerts when necessary

//Use to Render links into NavBar
let toShow = [
    {
      path: '/', 
      name: 'Home'
    },
    {
      path: '/SignUp', 
      name: 'Sign Up'
    }
  ]

class LogInPage extends Component {
    state = {
        isLogged: false,
        showLoading: false,
        showAlert: false
    }
    render() {
        //SUBMIT FORM TO LOG IN USER
        const SubmitForm = async (evt: any) => {
            evt.stopPropagation();
            evt.preventDefault();  
                this.setState({...this.state, showLoading: true})
                await fireApp.logIn(user)
                    .then(success => {
                        if(success.uid){
                            //If Log in waw successfull the set state
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
                <section className="img-bg-l">
                    <IonLoading
                        isOpen={this.state.showLoading}
                        message={'Loading...'}
                        duration={90000}
                    />
                    <form onSubmit={SubmitForm} >
                        <div className="title">
                            <h1>Log In!</h1>
                        </div>
                        <IonGrid>
                            
                            <IonRow className="ion-justify-content-center">
                                <IonCol>
                                    <IonItem className="item-s">
                                        <IonLabel position="floating">Email *</IonLabel>                                    
                                        <IonInput type="email" clearInput required name='userEmail' onInput={HandleData}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            
                            <IonRow className="ion-justify-content-center">
                                <IonCol>
                                    <IonItem className="item-s">
                                        <IonLabel position="floating">Password *</IonLabel>                                    
                                        <IonInput type="password" clearInput required name='userPassword' onInput={HandleData}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>

                            <IonRow className="ion-justify-content-center">
                                <IonCol>
                                    <IonButton shape="round" fill="outline"  color="light" type="submit" expand="block">Log In</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>

                    </form>

                </section>
                
                <Footer></Footer>
            </>

        );
    }
}

export default LogInPage;