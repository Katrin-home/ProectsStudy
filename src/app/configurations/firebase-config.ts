// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuVLYfyuWHTVdYGd9cP1QUvBtlotsfpyQ",
    authDomain: "bakery-shop-5454f.firebaseapp.com",
    projectId: "bakery-shop-5454f",
    storageBucket: "bakery-shop-5454f.appspot.com",
    messagingSenderId: "259004591396",
    appId: "1:259004591396:web:96cc898dd11792c3f157b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

// export const signup =