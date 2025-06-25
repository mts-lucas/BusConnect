// app.config.ts
import 'dotenv/config';
import { ExpoConfig } from '@expo/config';

interface ExtraConfig {
  firebaseApiKey: string;
  firebaseAuthDomain: string;
  firebaseProjectId: string;
  firebaseStorageBucket: string;
  firebaseMessagingSenderId: string;
  firebaseAppId: string;
  // Adicione outras variáveis aqui, se tiver
}

const appConfig = ({ config }: { config: ExpoConfig }): ExpoConfig & { extra: ExtraConfig } => {
  return {
    ...config,
    extra: { 
      firebaseApiKey: process.env.FIREBASE_API_KEY as string,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID as string,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
      firebaseAppId: process.env.FIREBASE_APP_ID as string,
    } as ExtraConfig,
  };
};

export default appConfig;