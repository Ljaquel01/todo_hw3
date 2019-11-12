import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyCagven339g-zCYWK8mVowIcJAzCGpibeY",
    authDomain: "todohw3-e271a.firebaseapp.com",
    databaseURL: "https://todohw3-e271a.firebaseio.com",
    projectId: "todohw3-e271a",
    storageBucket: "todohw3-e271a.appspot.com",
    messagingSenderId: "998319110597",
    appId: "1:998319110597:web:24fb6884b72fbfdfee73ac",
    measurementId: "G-KYJ9MENDKH"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;