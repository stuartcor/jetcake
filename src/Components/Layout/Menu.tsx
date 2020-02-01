import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonMenu, IonList, IonItem, IonRouterOutlet, IonMenuButton, IonApp, IonGrid, IonRow, IonCol, IonAvatar, IonImg } from '@ionic/react';
import React, { Component, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './style.css'

import profilePic from '../../assets/batman.png'

import fireApp from '../../dbFire';




function Menu (props: any){
        const [isLogged, setIsLogged] = useState(true);

        const  signOut = async() => {
            let signedOut = await fireApp.signOut();
            if(signedOut.ok){
                setIsLogged(false);
            }
         }

         if(!isLogged){
            return <Redirect to='/'></Redirect>
         }

         let img = props.photo == '' ? <IonImg src={profilePic}></IonImg>
                                    : <IonImg src={props.photo}></IonImg>

        return (
            <div>   
             <IonMenu side="start" contentId="menu-content" type="overlay">
                            <IonHeader>
                                <IonToolbar>
                                <IonTitle>Profile</IonTitle>
                                </IonToolbar>
                            </IonHeader>
                            <IonContent>
                                <br/>
                                <IonAvatar>
                                    {img}                                    
                                </IonAvatar>
                                <IonList>
                                    <Link to="/Edit"><IonItem>Edit</IonItem></Link>
                                    <IonItem><Link to="/Profile">Profile</Link></IonItem>
                                    <IonItem  onClick={signOut}>Sign Out!</IonItem>
                                </IonList>
                            </IonContent>
                        </IonMenu>
                        <IonRouterOutlet id="menu-content"></IonRouterOutlet>
        
                        <IonToolbar>
                        <IonTitle>JetCake</IonTitle>
                        <IonButtons slot="start">
                            <IonMenuButton autoHide={false} />
                        </IonButtons>
                        </IonToolbar>
            </div>
            
          );   
  

};

export default Menu;
