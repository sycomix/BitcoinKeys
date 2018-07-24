import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
    apiKey: "AIzaSyBkKqXm6W1RsiR9moRX5clW2zJ7qOR-VjI",
    authDomain: "bitcoin-keys.firebaseapp.com",
    databaseURL: "https://bitcoin-keys.firebaseio.com",
    projectId: "bitcoin-keys",
    storageBucket: "bitcoin-keys.appspot.com",
    messagingSenderId: "384769832056"
};

const devConfig = {
    apiKey: "AIzaSyBkKqXm6W1RsiR9moRX5clW2zJ7qOR-VjI",
    authDomain: "bitcoin-keys.firebaseapp.com",
    databaseURL: "https://bitcoin-keys.firebaseio.com",
    projectId: "bitcoin-keys",
    storageBucket: "bitcoin-keys.appspot.com",
    messagingSenderId: "384769832056"
  };
  
  const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};