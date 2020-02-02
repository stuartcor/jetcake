import { IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import React, { Component } from 'react';

import NavBar from '../Layout/NavBar';
import Footer from '../Layout/Footer';
import './Home.css'

import webDev from '../../assets/web-development.png';
import slideDev from '../../assets/slideshare-logo.png';


//Use to Render links into NavBar
let toShow = [
  {
    path: '/SignUp', 
    name: 'Sign Up'
  },
  {
    path: '/Login', 
    name: 'Log In!'
  }
]

class HomePage extends Component {
  
 render(){
  return (
    <>   
    <NavBar toShow={toShow}></NavBar>
      <section className="img-bg">
        <div className="title">
          <h1>React Front-end Project</h1>
          <h3>Powered by Stuart Cor</h3>
        </div>
      </section>
      <main className="main">
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-sm="6">
              <h1 className="title">Lorem Ipsum</h1>
              <IonImg src={webDev} className="img"></IonImg>
              <div>
                Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
              </div>
              <div>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              </div>
            </IonCol>              
            <IonCol size="12" size-sm="6">
              <h1 className="title">Lorem Ipsum</h1>
              <IonImg src={slideDev} className="img"></IonImg>
              <div>
                Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
              </div>
              <div>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </main>
      <br/>
      <br/>
      <Footer></Footer>
    </>
    
  );
 }
};

export default HomePage;
