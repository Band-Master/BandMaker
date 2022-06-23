import firebase from "firebase";
import 'firebase/storage';
import 'firebase/auth'

const firebaseConfig = {
    "projectId": "band-maker-d5da5",
    "appId": "1:513382101697:web:be8354a6c45f36f3779a40",
    "storageBucket": "band-maker-d5da5.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyDYwgWJ1ZCYD_GtnUQVjaGKpH992avkuGs",
    "authDomain": "band-maker-d5da5.firebaseapp.com",
    "messagingSenderId": "513382101697",
    "measurementId": "G-57EQE82BFL"
  };

export const baseApp = firebase.initializeApp(firebaseConfig);



