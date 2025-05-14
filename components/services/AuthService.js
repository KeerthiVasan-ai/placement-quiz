import { auth, firestore } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const loginUser = async (email, password) => {
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User logged in:', user.email);
    return user;
  } catch (error) {
    console.error('Error logging in:', error.message);
    return null;
  }
};

const signUpUser = async (email, password, name, rollNumber, phoneNumber) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(firestore, 'users', user.uid), {
      name: name,
      roll: rollNumber,
      phone: phoneNumber,
    });

    console.log('User registered:', user.email);
  } catch (error) {
    console.error('Error signing up:', error.message);
  }
};