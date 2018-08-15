import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import omapp from '../omapp/omapp.js';

import { Access } from "./Access.js";
import { Home } from "./Home.js";
import { SignUp } from "./SignUp.js";
import { Loading } from "./Loading.js";



import '../css/access.css';
import '../css/access.css';

export class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
        this.state.loginStatus = "NOT_AUTHENTICATED";
        this.state.loading = false;
        this.state.error = false;
        this.error = {message: ''};
        this.signupMethod = null;
        this.defaultProfilePhotoURL = 'http://sitelcity.com/wp-content/uploads/2015/04/default-user-image-300x300.png';
        this.user = {
            registered: false,
            registrationMethod: null,
            username: null,
            email: null,
            profilePhotoURL: null,
        }
    }

    googleAuthenticationHandler() {
        console.log("Setting loginState to LOADING");
        this.setState({loginStatus: "LOADING"});
        this.setState({loading: true});
        
        omapp.signInWithGooglePromise()
        .then(

        )
        .catch();
    }

    processLogIn(username, password) {
        this.setState({loading: true});
        omapp.signInWithEmail(username, password, this);
    }

    logoutHandler(){
        var thisComponent = this;
        omapp.signOutPromise().then(
            function(){
                thisComponent.setAuthenticationToNotAuthenticated();
            }    
        );
    }

    enableLoadingView(){
        this.setState({loading: true});
    }

    disableLoadingView(){
        this.setState({loading: false});
    }

    setAuthenticationToRegistered(){
        this.setState({loginStatus: "REGISTERED"});
    }

    setAuthenticationToNotAuthenticated(){
        this.setState({loginStatus: "NOT_AUTHENTICATED"});
    }

    showErrorView(error){
        this.error = error;
        this.setState({error: true,loading: false});
    }

    completarReg(email,password,nickname,idPlan, authLevel){
        
        var thisComponent = this;
        
        this.enableLoadingView();

        var userDataToRegister = {
            email: email,
            nickname: nickname,
            idPlan: idPlan,
            authLevel,
            signupMethod: this.signupMethod,
            profilePhotoURL: null
        };

        omapp.completeRegDBPromise(userDataToRegister, password)
        .then(function(user){
                thisComponent.user.email = user.email;
                thisComponent.user.nickname = user.nickname;
                thisComponent.setAuthenticationToRegistered();
                thisComponent.disableLoadingView();
            }
        )
        .catch(function(error){
                console.log(error);
                thisComponent.showErrorView(error);
                thisComponent.setAuthenticationToNotAuthenticated();
            }
        );
    }

    changeLoginStatusToRegistered(){
        this.setState({loginStatus: "REGISTERED", loading: false});
    }

    signupWithEmailAndPassword(){
        this.signupMethod = "email";
        this.setState({loginStatus: "SIGNUP"});        
    }

    signupWithGoogle(){
        this.signupMethod = "google.com";
        this.setState({loginStatus: "SIGNUP"});        
    }

    render() {

        console.log(this.state);

        if (this.state.loading){
            return <Loading/>;
        }

        switch(this.state.loginStatus) {
            case "SIGNUP":
                return <SignUp signUpMode={this.signupMethod} completarRegHandler={this.completarReg.bind(this)}/>
            case "NOT_AUTHENTICATED":
                return (<div>
                        <Messages error={this.state.error}/>
                        <Access 
                            googleAuthenticationHandler={this.googleAuthenticationHandler.bind(this)}
                            processLogIn={this.processLogIn.bind(this)}
                            signupWithEmailAndPasswordHandler={this.signupWithEmailAndPassword.bind(this)}
                            signupWithGoogleHandler={this.signupWithGoogle.bind(this)}
                            errors={<ErrorView errorMessage={this.error.message}/>}/>
                       </div>)
            case "AUTHENTICATED":
                return <SignUp  signUpMode={this.signupMethod} completarRegHandler={this.completarReg.bind(this)}/>
            case "REGISTERED":
                return <Home user={this.user} defaultProfilePhotoURL={this.defaultProfilePhotoURL} logoutHandler={this.logoutHandler.bind(this)}/>
            default:
                return <h1>ERROR - Shouldn't happen</h1>
        }
    }
}

var Messages = class Messages extends React.Component {
    render() {
        return (
            <h1>{this.props.error.message}</h1>
        )
    }
}

var ErrorView = class ErrorView extends React.Component {
    render() {

        if(this.props.errorMessage == ''){
            return null;
        }

        return (
            <p style={{color: "red"}}>Error: {this.props.errorMessage}</p>
        )
    }
}
