import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

  let firebaseConfig = {
    apiKey: "AIzaSyACYPOnq6OdoP3ayquqsKb9hj_JsFIyVqI",
    authDomain: "daily-os.firebaseapp.com",
    projectId: "daily-os",
    storageBucket: "daily-os.appspot.com",
    messagingSenderId: "180486860429",
    appId: "1:180486860429:web:95f57e9df21b345e847cc4",
    measurementId: "G-0FL7NQ9GN8"
  };
  // Initialize Firebase
 if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }

 export default firebase;