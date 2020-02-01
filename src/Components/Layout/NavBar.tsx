import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonMenu, IonList, IonItem, IonRouterOutlet, IonMenuButton, IonApp, IonGrid, IonRow, IonCol } from '@ionic/react';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './style.css'


function Navbar(props: any) {
  return (
    <div>   
      <IonToolbar>
        <IonButtons slot="primary">
          {props.toShow.map((data: any, id: any) => {
            return <IonButton key={id}>
                      <Link to={data.path}>{data.name}</Link> 
                  </IonButton>
          })}
        </IonButtons>
        <IonTitle><Link to="/">JetCake</Link></IonTitle>
    </IonToolbar>
    </div>
    
  );

};

export default Navbar;
