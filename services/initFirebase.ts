import firebase from 'firebase/app';
// @ts-ignore
import { API_KEY, AUTH_DOMAIN, DB_URL, PROJECT_ID, APP_ID, MEASUREMENT_ID } from 'react-native-dotenv';


export function initializeFirebase() {
  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DB_URL,
    projectId: PROJECT_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}