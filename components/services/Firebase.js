import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCs4Suq2A7M11zn-hL7diH9E2-5z93wKkU",
  authDomain: "careercatalyst-51376.firebaseapp.com",
  projectId: "careercatalyst-51376",
  storageBucket: "careercatalyst-51376.appspot.com",
  messagingSenderId: "979104786578",
  appId: "1:979104786578:web:813e49962ad03c3b889e4b"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const firestore = getFirestore(app);

export { auth, firestore };
export default app;