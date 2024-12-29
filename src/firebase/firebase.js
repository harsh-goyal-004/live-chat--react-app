import conf from "../conf/conf";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: conf.firebaseApiKey,
  authDomain: conf.firebaseAuthDomain,
  projectId: conf.firebaseProjectId,
  storageBucket: conf.firebaseStorageBucket,
  messagingSenderId: conf.firebaseMessagingSenderId,
  appId: conf.firebaseAppId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;
