import * as firebase  from 'firebase';

const config = {
    apiKey: "AIzaSyAO_hu54pRH16XgYNeGQv7wa53uxWnpE0M",
    authDomain: "react-to-do-app-6f9de.firebaseapp.com",
    databaseURL: "https://react-to-do-app-6f9de.firebaseio.com",
    projectId: "react-to-do-app-6f9de",
    storageBucket: "react-to-do-app-6f9de.appspot.com",
    messagingSenderId: "124680691727"
  };

  export const firebaseApp = firebase.initializeApp(config);