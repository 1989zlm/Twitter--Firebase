// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvfOZ7e-Utu6qEMVGOK4LHdVdgstH0yno",
    authDomain: "x-clone-firebase.firebaseapp.com",
    projectId: "x-clone-firebase",
    storageBucket: "x-clone-firebase.appspot.com",
    messagingSenderId: "173218623942",
    appId: "1:173218623942:web:f0a3453c5c68d21ca582c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//firebase auth un referansını alma
export const auth = getAuth(app);

// googele sağlayıcısını kurma
export const provider = new GoogleAuthProvider();

//veri tabınınn refernsını almak(db database in kısaltılmışı)
export const db = getFirestore(app);

//dosya yukleme alanının refeansını al
export const storage = getStorage(app);