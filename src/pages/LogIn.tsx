import React, { Component } from 'react';
import { IonPage } from '@ionic/react';

import LogInPage from '../Components/LogInPage/LogInPage'

class SignUp extends Component{
    render(){
        return(
            
        <IonPage>
            <LogInPage></LogInPage>
        </IonPage>
        )
    }
}

export default SignUp;