import React, { Component } from 'react';
import { IonPage } from '@ionic/react';

import SignUpPage from '../Components/SignUpPage/SignUpPage'

class SignUp extends Component{
    render(){
        return(
            
        <IonPage>
            <SignUpPage></SignUpPage>
        </IonPage>
        )
    }
}

export default SignUp;