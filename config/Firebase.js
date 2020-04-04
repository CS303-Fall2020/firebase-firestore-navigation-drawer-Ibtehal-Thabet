import * as firebase from 'firebase';
import'firebase/firestore';

// const settings = {timestampsInSnapshots: true};

const firebaseConfig = {
    apiKey: "AIzaSyCadi2l0aZPKPJoZy6PO-MKfjCACVYdgEc",
    authDomain: "myapp1-3faa9.firebaseapp.com",
    databaseURL: "https://myapp1-3faa9.firebaseio.com",
    projectId: "myapp1-3faa9",
    storageBucket: "myapp1-3faa9.appspot.com",
    messagingSenderId: "962718156409",
    appId: "1:962718156409:web:914d0f616216d050e2b6a8",
    measurementId: "G-XJTLV0WTZ1"
  };
  // Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default Firebase;