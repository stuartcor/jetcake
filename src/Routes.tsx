import * as React from 'react';
import { Switch, Route, Redirect,  RouteProps } from 'react-router-dom';


/*Pages to Show*/ 
import Home from './pages/Home';
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Login from './pages/LogIn'
import Edit from './pages/Edit'
import firebase from 'firebase';

//Use To Protect Routes when user is not logged

const Router = (props: any) => (
  
    <Switch>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/Login" component={Login} />
        <PrivateRoute exact path="/Profile" component={Profile} />
        <PrivateRoute exact path="/Edit" component={Edit} />
        <Route path="*"  component={Home} />
    </Switch>
  
)

const PrivateRoute: React.SFC<RouteProps> = 
  ({ component: Component, ...rest })  => {
     let user =  firebase.auth().currentUser;
    if (!Component) {
        return null;
    }
    
   return <Route
        {...rest}
        render={props =>  
        user ? (
            <Component {...props} />
        ) : (
            <Redirect
            to={{
                pathname: "/"
            }}
            />
        )
        }
    />    
  };


export default Router;