import firebase from "firebase/app";
import { firebaseAuth } from "../services/firebase";
import { useEffect, useState } from "react";
import { User } from "../types/user";

export function useAuthentication() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      setUser(null);
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          providerId: firebaseUser.providerId,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        });
      }
    });

    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          const credential: firebase.auth.OAuthCredential = result.credential;
        }
      })
      .catch((error) => {
        console.error(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("errorCode", errorCode);
        console.error("errorMessage", errorMessage);
      });
    return () => unsubscribe();
  }, []);
  return { user };
}

export const Login = async () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  await firebaseAuth.signInWithRedirect(provider);
};

export const Logout = async () => {
  await firebaseAuth.signOut();
  window.location.reload();
};
