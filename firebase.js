import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBgMJlt4vz3t_kSFMk-G7ePNtgA5XPF0nc',
    authDomain: 'rating-app-cf5be.firebaseapp.com',
    projectId: 'rating-app-cf5be',
    storageBucket: 'rating-app-cf5be.appspot.com',
    messagingSenderId: '86155305285',
    appId: '1:86155305285:web:c84bd9c4fe158a6d8f5e2c',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
