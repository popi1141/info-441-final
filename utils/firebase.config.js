import * as firebase from "firebase/app"
import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCnJjXwrRrAQse-lEVxn6g7dffjZasAYxE",
    authDomain: "info-441-final.firebaseapp.com",
    projectId: "info-441-final",
    storageBucket: "info-441-final.appspot.com",
    messagingSenderId: "64030943073",
    appId: "1:64030943073:web:58f683f360c55976cf4720"
};

if (!getApps.length) {
    firebase.initializeApp(firebaseConfig);
}
