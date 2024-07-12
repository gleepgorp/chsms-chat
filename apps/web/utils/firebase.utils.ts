import { getApps, initializeApp } from 'firebase/app';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
  setPersistence,
  getAuth,
  signOut,
  User,
} from 'firebase/auth'

import firebaseConfig from '../configs/firebaseConfig';

const firebaseApps = getApps();
let firebaseApp;

if (!firebaseApps.length) {
  firebaseApp = initializeApp(firebaseConfig);
}
const auth = getAuth(firebaseApp);

async function forgotPassword(email: string): Promise<void> {
  sendPasswordResetEmail(auth, email);
}

async function logout(): Promise<void> {
  signOut(auth);
  localStorage.clear();
} 

async function setRememberUser(shouldRemeberUser: boolean): Promise<void> {
  await setPersistence(
    auth,
    shouldRemeberUser ? browserLocalPersistence : browserSessionPersistence,
  );
}

async function registerWithEmailAndPassword(email: string, pasword: string): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(auth, email, pasword);

  return user;
}

async function signInWithEmailPassword(email: string, password: string): Promise<User> {
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  return user;
}

export {
  auth,
  logout,
  forgotPassword,
  setRememberUser,
  registerWithEmailAndPassword,
  signInWithEmailPassword,
}
