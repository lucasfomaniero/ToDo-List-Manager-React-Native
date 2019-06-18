import firebase from "firebase";
import NavigationService from './NavigationService';

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

export const signInOnFirebaseAsync = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const readTasksFromFirebaseAsync = async (listener) => {
    const user = await currentFirebaseUser();

    let taskReference = firebase
        .database()
        .ref(user.uid)
        .child('tasks');

    taskReference
        .on('value', (snapshot) => {
            var tasks = [];
            snapshot.forEach(function (element) {
                var task = element.val();
                task.key = element.key;
                tasks.push(task);
            });
            listener(tasks);
        })
};

export const deleteTaskOnFireBaseAsync = async (task) => {
    const user = await currentFirebaseUser();
    let tasksReference = firebase.database().ref(user.uid);
    const key = task.key;
    return await tasksReference.child(`tasks/${key}`).remove();
};

export const writeTaskOnFirebaseAsync = async task => {
    const user = await currentFirebaseUser();

    let tasksReference = firebase.database().ref(user.uid);

    const key = task.key ? task.key : tasksReference.child("tasks").push().key;

    return await tasksReference.child(`tasks/${key}`).update(task);
};


export const logoutFromFirebaseAsync = async () => {
    try {
        await firebase.auth().signOut();
        NavigationService.navigate("pageLogin");
    } catch (e) {
        console.log(e)
    }
};

export const initializeFirebaseAPI = () => firebase.initializeApp(config);
