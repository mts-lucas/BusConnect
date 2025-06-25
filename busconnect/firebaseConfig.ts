// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// @ts-ignore 
import { initializeAuth } from 'firebase/auth';
import Constants from 'expo-constants'; //
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseApiKey = Constants.expoConfig?.extra?.firebaseApiKey as string | undefined;
const firebaseAuthDomain = Constants.expoConfig?.extra?.firebaseAuthDomain as string | undefined;
const firebaseProjectId = Constants.expoConfig?.extra?.firebaseProjectId as string | undefined;
const firebaseStorageBucket = Constants.expoConfig?.extra?.firebaseStorageBucket as string | undefined;
const firebaseMessagingSenderId = Constants.expoConfig?.extra?.firebaseMessagingSenderId as string | undefined;
const firebaseAppId = Constants.expoConfig?.extra?.firebaseAppId as string | undefined;

if (
  !firebaseApiKey ||
  !firebaseAuthDomain ||
  !firebaseProjectId ||
  !firebaseStorageBucket ||
  !firebaseMessagingSenderId ||
  !firebaseAppId
) {
  console.error("Erro: Uma ou mais variáveis de ambiente do Firebase estão faltando.");
  console.error("Verifique seu arquivo .env e app.config.ts.");
  throw new Error("Configurações do Firebase incompletas. Por favor, verifique suas variáveis de ambiente.");
}

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app);
