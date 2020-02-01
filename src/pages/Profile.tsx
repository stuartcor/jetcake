import React, { Component } from 'react';
import { IonPage } from '@ionic/react';

import ProfilePage from '../Components/ProfilePage/ProfilePage'

class Profile extends Component{
    render(){
        return(
            
        <IonPage>
            <ProfilePage></ProfilePage>
        </IonPage>
        )
    }
}

export default Profile;