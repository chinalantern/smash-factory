import firebase from "firebase/app"
import "firebase/auth"

export const auth =  firebase.initializeApp ({
    apiKey: "AIzaSyDEfcIVEkLvZu7d0zMTcKGo1_NppLM4MBA",
    authDomain: "smash-factory.firebaseapp.com",
    projectId: "smash-factory",
    storageBucket: "smash-factory.appspot.com",
    messagingSenderId: "352065644996",
    appId: "1:352065644996:web:a84c4df4b808d316c25c91"
  }).auth()