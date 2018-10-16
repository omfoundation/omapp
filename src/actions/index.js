import * as omapp from '../omapp/omapp'
import { push } from 'connected-react-router'

export const SIGN_UP_USER_WITH_GOOGLE = 'SIGN_UP_USER_WITH_GOOGLE'
export const SHOW_SIGN_UP_VIEW = 'SHOW_SIGN_UP_VIEW'
export const SHOW_HOME_VIEW = 'SHOW_HOME_VIEW'
export const SHOW_LOADING_STATE = 'SHOW_LOADING_STATE'
export const SIGN_UP_USER = 'SIGN_UP_USER'
export const LOG_OUT_START = 'LOG_OUT_START'
export const SAVE_USER_INFO = 'SAVE_USER_INFO'

export const SHOW_SCREEN_TEST = 'SHOW_SCREEN_TEST'



export function showScreenTest(nameScreen){
    return{
        type: SHOW_SCREEN_TEST,
        screen: nameScreen
    }
}

function signUpUserWitnGoogle() {
      return {
          type: SIGN_UP_USER_WITH_GOOGLE
      }
  }

function showSignUpView(userInfo) {
    return {
        type: 
            SHOW_SIGN_UP_VIEW,
            userInfo: userInfo
        }
}

function showHomeView(userInfo) {
    if(userInfo === undefined){
        userInfo = {}
    }
    return {
        type: 
            SHOW_HOME_VIEW,
            userInfo: userInfo
        }
}

function saveUserInfo(userInfo) {
    return {
        type: 
            SAVE_USER_INFO,
            userInfo: userInfo
        }
}

function showLoadingState() {
    return {
        type: 
            SHOW_LOADING_STATE
        }
}

export function logOut(){
    return {
        type: 
            LOG_OUT_START
        }   
}

export function signUpUser(userInfo){
    /*
    return dispatch => {
        dispatch(showLoadingState())
        return  omapp.signupUser(userInfo)
                .then(userInfo => dispatch(showHomeView(userInfo)))
    }
    */
   return showHomeView(userInfo)
}

export function requestUserInfoFromGoogle() {
    
    return dispatch => {
        dispatch(showLoadingState())
        dispatch(signUpUserWitnGoogle())
        return  omapp.getUserInfoFromGoogle()
                .then(userInfo => {
                    if(userInfo !== undefined || userInfo !== null) {
                        dispatch(signUpUserWitnGoogle());
                        dispatch(push('/signup'));
                    }
                })
    }
    
   //return showSignUpView()

   //return dispatch => {
     //  dispatch(push('/SignUp'));
   // }
}