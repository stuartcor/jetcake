import React, { Component } from 'react';
import { IonPage } from '@ionic/react';

import EditPage from '../Components/EditPage/EditPage'

class Profile extends Component{
    render(){
        return(
            
        <IonPage>
            <EditPage></EditPage>
        </IonPage>
        )
    }
}

export default Profile;