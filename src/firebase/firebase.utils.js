import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
   apiKey: "AIzaSyDJm8bWRPUBBFUW_7GUGHhIya5n24WZayY",
   authDomain: "crwn-db-9c3d4.firebaseapp.com",
   databaseURL: "https://crwn-db-9c3d4.firebaseio.com",
   projectId: "crwn-db-9c3d4",
   storageBucket: "crwn-db-9c3d4.appspot.com",
   messagingSenderId: "113924341847",
   appId: "1:113924341847:web:475600b5a874dbb6f6a312",
   measurementId: "G-FR869KGXH9"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);
   const snapShot = await userRef.get();   

   if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
         })
      } catch (err) {
         console.log(err);
      }
   }

   return userRef;

}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;