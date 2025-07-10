import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

const firebaseApiKey = Constants.expoConfig?.extra?.firebaseApiKey;
const firebaseAuthDomain = Constants.expoConfig?.extra?.firebaseAuthDomain;
const firebaseProjectId = Constants.expoConfig?.extra?.firebaseProjectId;
const firebaseStorageBucket = Constants.expoConfig?.extra?.firebaseStorageBucket;
const firebaseMessagingSenderId = Constants.expoConfig?.extra?.firebaseMessagingSenderId;
const firebaseAppId = Constants.expoConfig?.extra?.firebaseAppId;

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const auth = initializeAuth(app);
export { app, db, storage };