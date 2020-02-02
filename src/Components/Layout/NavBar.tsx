import {  IonTitle, IonToolbar, IonButton, IonButtons} from '@ionic/react';
import React from 'react';
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
