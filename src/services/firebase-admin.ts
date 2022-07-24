import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID as string,
  privateKeyId: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID as string,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  ) as string,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL as string,
  clientId: process.env.FIREBASE_ADMIN_CLIENT_ID as string,
  authUri: process.env.FIREBASE_ADMIN_AUTH_URI as string,
  tokenUri: process.env.FIREBASE_ADMIN_TOKEN_URI as string,
};

if (!getApps().length) {
  initializeApp({
    credential: cert(firebaseAdminConfig),
  });
}

export const auth = getAuth();

export const firestore = getFirestore();
