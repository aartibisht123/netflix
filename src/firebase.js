import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, 
        getAuth,
        signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBqIxrIK3tBwi8CfYFpdIdwgiyRaRSn0ao",
  authDomain: "netflix-2705f.firebaseapp.com",
  projectId: "netflix-2705f",
  storageBucket: "netflix-2705f.firebasestorage.app",
  messagingSenderId: "40330210607",
  appId: "1:40330210607:web:056d7b128b44329defc5da"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
try {
  const res = await createUserWithEmailAndPassword(auth,email, password);
  const user = res.user;
  await addDoc(collection(db, "user"),{
    uid: user.uid,
    name,
    authProvider: "local",
    email,
  });
  console.log("Signup successful");

} catch (error) {
   console.log(error) ;
   toast.error(error);
}

}

const login = async (email, password) =>{
try {
   await signInWithEmailAndPassword(auth, email,password);
} catch (error) {
    console.log(error);
    toast.error(error)
}
};

const logout = () =>{
    signOut(auth);
}

export {auth, db, login, signup, logout };