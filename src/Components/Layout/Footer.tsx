import React, { Component } from 'react';
import { IonFooter, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon } from '@ionic/react';

import {logoFacebook} from 'ionicons/icons'
import {logoLinkedin} from 'ionicons/icons'
import {logoGithub} from 'ionicons/icons'


import './style.css'

class Footer extends Component {

    render(){
        return(
            <>
                <IonContent className="Footer"></IonContent>
                <IonFooter>
                    <IonToolbar>
                        <IonButtons slot="primary">
                            <IonButton>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/cordeleon">
                                    <IonIcon icon={logoFacebook}></IonIcon>
                                </a>
                            </IonButton>
                            <IonButton>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/stuartcor">
                                    <IonIcon icon={logoLinkedin}></IonIcon>
                                </a>
                            </IonButton><IonButton>
                                <a target="_blank" rel="noopener noreferrer" href="http://">
                                    <IonIcon icon={logoGithub}></IonIcon>
                                </a>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Stuart Cor</IonTitle>
                    </IonToolbar>
                </IonFooter>
            </>
        );
    }
}

export default Footer;