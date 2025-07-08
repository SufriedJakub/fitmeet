// firebase/config.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCCoYplN4cBynpqpHaMz3vBMmXyAfQJLdo",
  authDomain: "fitmeet-e75b5.firebaseapp.com",
  projectId: "fitmeet-e75b5",
  storageBucket: "fitmeet-e75b5.appspot.com",
  messagingSenderId: "478060677612",
  appId: "1:478060677612:web:cc18520148470b409e58c9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
