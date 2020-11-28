// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD8udE2U7TL4QkyIKPVceMFJozTsSvu9jQ",
    authDomain: "jonathanlynprojectfive.firebaseapp.com",
    databaseURL: "https://jonathanlynprojectfive.firebaseio.com",
    projectId: "jonathanlynprojectfive",
    storageBucket: "jonathanlynprojectfive.appspot.com",
    messagingSenderId: "374788941465",
    appId: "1:374788941465:web:ed5d089d392b3035eafa08"
};
firebase.initializeApp(firebaseConfig);

export default firebase;