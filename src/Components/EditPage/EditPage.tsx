import React, { Component } from 'react';
import fireApp from '../../dbFire';

import Menu from '../Layout/Menu';
import Footer from '../Layout/Footer';

import { IonGrid, IonRow, IonCol, IonItem, IonImg, IonLabel, IonInput, IonIcon, IonButton, IonTextarea, IonDatetime, IonCard, IonCardHeader, IonCardSubtitle, IonToast} from '@ionic/react';

import firebase from 'firebase';

import { cloudUpload} from 'ionicons/icons';
let isUser: any;
let user = {};


class EditPage extends Component {

    state = {
        user: {
            name: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            dateBirth: '',
            photo: '',
            answers: [],
        }, 
        showToast: false,
    }

    
    
    componentWillMount(){
        isUser = fireApp.checkUser();
        if(isUser){
            //Use to get infor from user, in these case we do not need to listeng for changes 
            const getUserInfo = async (id: any) =>{
                let info = await fireApp.getUserAllInfo(id);
                this.setState({user: {email: isUser.email, ...info}});
                user = this.state.user;
            }

            getUserInfo(isUser.uid);
            

        }
        
    }

    render(){       
        
        //Handle event to upload picture to firebase
        const handlePicture = (evt: any) => {
            let picture = evt.target.files[0];
            
            firebase.storage().ref().child('images/'+isUser.uid)
                .put(picture)
                .then(snapshot => {
                    snapshot.ref.getDownloadURL()
                        .then(url => {
                            this.setState({user: {...this.state.user, photo: url}})
                            fireApp.updateUser(isUser.uid, this.state.user);
                        })
                })
        }

        //Event created to handle data from inputs, gets the name of the input and assigned to user object
        const HandleData = (evt: any) =>{
            Object.defineProperty(user, evt.target.name, {
                value: evt.target.value,
                writable: true,
                enumerable: true,
                configurable: true
            });              
        } 
        
        //Submit when click on save changes
        const SubmitForm = async (evt: any) => {
            evt.stopPropagation();
            evt.preventDefault();  
            fireApp.updateUser(isUser.uid, user)
            this.setState({...this.state, showToast: true})
        }

        let imgShow = this.state.user.photo === '' ? 
        <>
            <div className="user-no-profile">
                <input className="img-upload" type="file" accept="image/*" capture onChange={handlePicture}></input>
            </div> 
        </> 
        : 
        <>
         <div className="container">
            <img  src={this.state.user.photo} className="image"></img>   
            <div className="overlay">
                <IonIcon className="icon" icon={cloudUpload}>
                </IonIcon> 
                <input className="img-upload" type="file" accept="image/*" capture onChange={handlePicture}></input>
            </div>
        </div>
        </>
        



        return(
            <>
                <Menu photo={this.state.user.photo}></Menu>
                <IonToast
                    isOpen={this.state.showToast}
                    onDidDismiss={() => 
                        this.setState({...this.state, showToast: false})
                    }
                    message="Your changes have been saved."
                    duration={800}
                />

                <section className="img-bg-s">
                    <form onSubmit={SubmitForm}>
                        <IonGrid>
                            <IonRow>
                                <IonCol className="title-edit">
                                    <h1 >Let's Edit!</h1>
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-justify-content-center">
                                <IonCol></IonCol>
                                <IonCol size="6" sizeSm="2" className="ion-align-self-center ">                                
                                    {imgShow}
                                </IonCol>                            
                                <IonCol></IonCol>
                            </IonRow>
                            <IonRow className="ion-justify-content-center">
                                <IonCol>
                                    <IonItem className="item-s">
                                        <IonLabel position="floating">Name</IonLabel>                                    
                                        <IonInput type="text"  name='name' value={this.state.user.name} onInput={HandleData}></IonInput>
                                    </IonItem>
                                </IonCol>
                                
                                <IonCol>
                                    <IonItem className="item-s">
                                        <IonLabel position="floating">Last Name</IonLabel>                                    
                                        <IonInput type="text"  name='lastName' value={this.state.user.lastName} onInput={HandleData}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-justify-content-center">
                                <IonCol>
                                    <IonItem className="item-s">
                                        <IonLabel position="floating">Email</IonLabel>                                    
                                        <IonInput type="email"  name='email' value={this.state.user.email} disabled></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-justify-content-center">
                                <IonCol>
                                    <IonItem className="item-s">
                                        <IonLabel position="floating">Phone Number</IonLabel>                                    
                                        <IonInput type="text"  name='phoneNumber' value={this.state.user.phoneNumber} onInput={HandleData}></IonInput>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-justify-content-center">
                                <IonCol>
                                    <IonItem className="item-s">
                                        <IonLabel position="floating">Address</IonLabel>                                    
                                        <IonTextarea autoGrow  name='address' value={this.state.user.address} onInput={HandleData}></IonTextarea>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow className="ion-justify-content-center">
                                <IonCol>
                                    <IonItem className="item-s">
                                        <IonLabel position="floating">Date of Birth</IonLabel>
                                        <IonDatetime  displayFormat="MM/DD/YY" name='dateBirth' value={this.state.user.dateBirth} onInput={HandleData}></IonDatetime>
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="title-edit">
                                    <h1 >Security Questions</h1>
                                </IonCol>
                            </IonRow>


                            {
                                this.state.user.answers.map((answer: any, id) =>{
                                    return(
                                        <IonRow className="ion-justify-content-center" key={id}>
                                            <IonCol>
                                                <IonCard className="card-bg-s">
                                                    <IonCardHeader>
                                                        {answer.question}  
                                                        <br/>                                                
                                                        <IonCardSubtitle>{answer.answer}</IonCardSubtitle>
                                                    </IonCardHeader>
                                                </IonCard>
                                            </IonCol>
                                    </IonRow>  ) 
                                    
                                })
                            }
                            

                            <IonRow className="ion-justify-content-center">
                                <IonCol>
                                    <IonButton shape="round" fill="outline" color="light" type="submit" expand="block">Save Changes</IonButton>
                                </IonCol>
                            </IonRow>
                            
                        </IonGrid>
                    </form>

                </section>
                <Footer></Footer>
            </>
        )
    }
}

export default EditPage;