import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
var firebaseConfig = {
    apiKey: "AIzaSyCo_pwojk9jFrblpRraoIFFaQQhoglp5Ds",
    authDomain: "onlinewebapp-c04cd.firebaseapp.com",
    databaseURL: "https://onlinewebapp-c04cd.firebaseio.com",
    projectId: "onlinewebapp-c04cd",
    storageBucket: "onlinewebapp-c04cd.appspot.com",
    messagingSenderId: "28482593341",
    appId: "1:28482593341:web:55a855e16c1ef9cb680054",
    measurementId: "G-DF4ZNN1KLQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
