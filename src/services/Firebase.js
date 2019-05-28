import firebase from "firebase";

const config = {
    apiKey: "AIzaSyC8ic-DqkvjAbrEpiDnRQa0X1gfeoka2HQ",
    authDomain: "fir-applucasmaniero.firebaseapp.com",
    databaseURL: "https://fir-applucasmaniero.firebaseio.com",
    projectId: "fir-applucasmaniero",
    storageBucket: "fir-applucasmaniero.appspot.com",
    messagingSenderId: "764174719294",
    appId: "1:764174719294:web:1d9972337e39290f"
};

export const createUserOnFirebaseAsync = async (email, password) => {
    const {user} = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

    return user;
};

export const signInOnFirebaseAsync = async (email, password) => {
    return await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
};

export const currentFirebaseUser = () => {
    return new Promise((resolve, reject) => {
        var unsubscribe = null;
        unsubscribe = firebase.auth().onAuthStateChanged(
            user => {
                resolve(user);
            },
            error => {
                reject(error);
            },
            () => {
                unsubscribe();
            }
        );
    });
};

export const initializeFirebaseAPI = () => firebase.initializeApp(config);
