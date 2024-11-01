import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD7BrQrcoWO3xycBT3hMAD2J5y76Sivajo",
    authDomain: "habitos-app-tp3.firebaseapp.com",
    projectId: "habitos-app-tp3",
    storageBucket: "habitos-app-tp3.firebasestorage.app",
    messagingSenderId: "636541102579",
    appId: "1:636541102579:android:ffcd640e56a8236e5a0a86",
};

const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);

export const auth = getAuth(app);
