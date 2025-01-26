import Firebase from 'firebase';  

let config = {
  // FIREBASE CREDENTIALS
    apiKey: process.env['API_KEY'],
    authDomain: "digi-household-booklet.firebaseapp.com",
    databaseURL: "https://digi-household-booklet.firebaseio.com",
    projectId: "digi-household-booklet",
    storageBucket: "digi-household-booklet.appspot.com",
    messagingSenderId: process.env['MESSAGE_SENDER_ID']
  };

let app = Firebase.initializeApp(config);  

export const db = app.database();  