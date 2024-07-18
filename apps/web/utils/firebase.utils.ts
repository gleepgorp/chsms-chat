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
import { doc, setDoc, serverTimestamp, getFirestore } from 'firebase/firestore';
import firebaseConfig from '../configs/firebaseConfig';
import randomColorRGB from './randomRGB.util';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

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

async function registerWithEmailAndPassword(email: string, password: string, firstname: string, lastname: string): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  try {
    await setDoc(doc(db, 'users', user.uid), {
      accountId: user.uid,
      createdAt: serverTimestamp(),
      email: email,
      firstname: firstname,
      lastname: lastname,
      lastLogin: serverTimestamp(),
      profilePicture: "",
      status: "active",
      bio: "",
      profileBgColor: randomColorRGB(),
    });
  } catch (err) {
    console.log(err);
  }

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
