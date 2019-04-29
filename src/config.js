import Firebase from 'firebase';  

let config = {
  // FIREBASE CREDENTIALS
    apiKey: "AIzaSyBxi3YJtG2ah0ill77rzrt-wbtjcp2UKPQ",
    authDomain: "digi-household-booklet.firebaseapp.com",
    databaseURL: "https://digi-household-booklet.firebaseio.com",
    projectId: "digi-household-booklet",
    storageBucket: "digi-household-booklet.appspot.com",
    messagingSenderId: "342424669855"
  };

let app = Firebase.initializeApp(config);  

export const db = app.database();  