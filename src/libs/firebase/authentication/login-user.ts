import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

async function loginUser(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export default loginUser;
