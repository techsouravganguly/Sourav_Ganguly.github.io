var firebaseConfig = {
    apiKey: "AIzaSyBZXdSjTHTKngKWlzOvqMlnum64M-rf7jQ",
    authDomain: "clone-b8bcd.firebaseapp.com",
    projectId: "clone-b8bcd",
    storageBucket: "clone-b8bcd.appspot.com",
    messagingSenderId: "170744945385",
    appId: "1:170744945385:web:99c3f5b936f633a01b2e78",
    measurementId: "G-BLQYFMZXPC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();