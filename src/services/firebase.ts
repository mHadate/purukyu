import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  TwitterAuthProvider,
  signOut,
  onAuthStateChanged as onFirebaseAuthStateChanged,
} from "firebase/auth";
import { User } from "../types/user";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const config: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINT_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

export const firebaseApp = initializeApp(config);

const provider = new TwitterAuthProvider();

export const login = (): void => {
  const auth = getAuth(firebaseApp);
  signInWithRedirect(auth, provider);
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => resolve(true))
      .catch((error) => reject(error));
  });
};

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  const auth = getAuth(firebaseApp);

  onFirebaseAuthStateChanged(auth, (user) => {
    const userInfo: User | null = user
      ? {
          uid: user?.uid,
          providerId: user?.providerId,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
        }
      : null;
    callback(userInfo);
  });
};
