import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAmVtMWsX-FJJKJeWQMqbwkEL_zZUCrFr0",
    authDomain: "whatsappclone-ac812.firebaseapp.com",
    projectId: "whatsappclone-ac812",
    storageBucket: "whatsappclone-ac812.appspot.com",
    messagingSenderId: "508007113371",
    appId: "1:508007113371:web:80483cc946632345ebdc3e",
    measurementId: "G-VS29F7RKRY"
  };
  
 const app = !firebase.apps.length? firebase.initializeApp(firebaseConfig) : firebase.apps[0];

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export {db, auth, provider};

