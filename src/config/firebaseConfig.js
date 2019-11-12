import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    //apiKey: "AIzaSyCJxkqx-6PMJrZ7ACkrgbO55b5wmJdop1Y",
    //authDomain: "todo-rrf-316.firebaseapp.com",
    //databaseURL: "https://todo-rrf-316.firebaseio.com",
    //projectId: "todo-rrf-316",
    //storageBucket: "todo-rrf-316.appspot.com",
    //messagingSenderId: "892398996038",
    //appId: "1:892398996038:web:1fb9157fc6c5d266e01847",
    //measurementId: "G-TEGQB3MZ23"
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