import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonMenu, IonList, IonItem, IonRouterOutlet, IonMenuButton, IonApp, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import React, { Component } from 'react';
import HomePage from '../Components/HomePage/HomePage'

import fireApp from '../dbFire';
import { Redirect } from 'react-router';
import firebase from 'firebase';


let isLogged = false

class Home extends Component {
  constructor(props: any) {
    super(props)
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({isLogged :true});
      }
    })
  }

  state = {
    isLogged
  }
  
 render(){
   if(this.state.isLogged) {
    return <Redirect to='/Profile'></Redirect>
   }

   return (
     <IonPage>
      <HomePage></HomePage>
    </IonPage>

  );
 }
};

export default Home;
