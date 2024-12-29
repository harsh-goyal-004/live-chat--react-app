import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
  onAuthStateChanged,
} from "firebase/auth";

export class AuthService {
  constructor() {
    this.setPersistence();
  }

  async setPersistence() {
    try {
      await setPersistence(auth, browserLocalPersistence);
      console.log("SetPersistence Successful");
    } catch (error) {
      console.log("SetPersistence Error : ", error);
    }
  }

  async signUp(email, password, name) {
    try {
      //   console.log(email, password, name);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
      return user;
    } catch (error) {
      console.log("Sign Up Error : ", error);
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      const userCredetional = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredetional.user;
      return user;
    } catch (error) {
      console.log("Sign In Error : ", error.message);
      throw error;
    }
  }

  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const { accessToken, displayName, email, uid } = user;
        callback({ accessToken, displayName, email, uid });
      } else {
        callback(null);
      }
    });
  }
}

const authService = new AuthService();

export default authService;
