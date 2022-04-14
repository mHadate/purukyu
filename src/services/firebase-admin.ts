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
  // privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDTMAtMLM6ktDZL\nVLi3cHJGunakhO0Ete4V2zF3CEH4M9wuNQw4SHH4FrCjYSQUUR6DWT9Q7amU2qOt\nvqKfIRZBB0WmrBOC/i6csSaAYvtEy57mvDgnu6oz1DV0PyMsBCAerVGhDtYwFpjq\n9vzZ+9U8drqzRBEqIr2M8DzpM7NpRmHYL3WelOV+RoX/gQAsaRlW5TVUDdUhu9nV\nKQIRIAqFAwEgXm6CGz9PekUWWkI6w7CB7Nfj6dVvp7Sqg84rNmgGnAjKPrMLPMVT\nKnAqP8Ew8iRZj+AOhlI3hD78g3u9jILi5nCizlKwdQibmeRNuaQWPj7pXu2GADOj\n/Z8gqvPzAgMBAAECggEAH9wJdZz0MbRpf8omBwUk4EGvYK4YTv5z5AKKKacVGLDD\ngIm1MGUmzbf9Pts1RQa11TfouDiaaDU8aHDaz1R/qyDB47KQS6c1TfiK/TxcJBVE\ngWeXYHsht/7wGiY6PqDYCE4Prf3zLGmu+RIjXsPsooSrhsbNK2+hQTqu3bl/Jpws\nMBKqvtUdM3PSKHyrVPs6drYRAH5HSkcva5VtgIB+9VUywfc9mSfE4r2GD/QWOXcf\nveZE2/RnN9PcP/C06QQsehMvjjuoX7HeBbbMN6QacqkW5TRaONdB9lye53ZAsRx+\nCZoTGLUyQCYEZAT7KMzpqiPiZ3oYopa4CzG4iurWzQKBgQDzSb3TQUARCCjqR+3b\nTIXC8XXmjnA76D7B6rIzttSrCCTfBxnncI4pZ5v7p9Q/IR2f+JortGBqfcInceOT\nWgQjWVFVutYWhVxKRwB9SlMzORRS12SXrStcS8cZnXihMzJGVth30Pl3rg99ufUa\n2H37jji0oDjfolSwyDNe51wYXQKBgQDeOOxJGkss3xOnYwndKgxkbXB0VSEKm9BQ\nEiUPQEa8H95tulx1sVYJM123QNXwc5ip9ennGXb+pUth8R1kUWLfvDOz/F4PwmVE\ndEwcrjoefwo/1vQkIR6b7TMcrX1ot94eZ7lIn46QzuxLCFgZoflsxNSD0OoVRum+\n9WDhuCk4jwKBgD041VgQF3sxvnoWV7jT7OU9thmqxnuM2h4aXXW+EI5poj2tn8sp\n+9xXgl01wqeQQdA70zAkWA70TqN2eXpfMKNkmp8kQTOxo6PdcjYVOhKtznt6UIoK\nvdqgBx5fDjgilgg1WovsPprrZmKRJSj4Sdu/0m1B1I4SX5WNC8BaIEbRAoGAf+aT\nWJ/hlLnwPe8qxjhlWYgDqXE1yz1S8EMBQX3lOHG/O7h/bt3afwEpd0fB2tstiuUW\n8wQdEQNiF8UG/a46EjvoJjeii79/OZ8WD4vXt6W26Hd3nTPSwjwLpv3TqGnrVeSt\nJ7dt/rqaFbV/v4ESZiADkLq1f/mIn3frgv7T+tECgYEAkmWeO4u2LGTVdWow9GMg\nKNajnQUMW0Q3KeQ8j+A7Cs1n8Yp5dIWBAS8Ri5UcllV/OlJTtzSR+JJ4JuomHr94\nPAGjb0jn0SJVLO92QjRPSZN6A6HClCebxnX+aOaRbRuXqWlTbYnPkB0PQ2i9/ufA\nLMid1pvQutzYFV35MT2M4bk=\n-----END PRIVATE KEY-----\n",
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
