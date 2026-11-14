import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const env = import.meta.env;

const firebaseConfig = {
  apiKey: "AIzaSyC4VAykq52X_tttMj6fqKWBXmC3iE_ev4o",
  authDomain: "student-portal-security-bbf80.firebaseapp.com",
  projectId: "student-portal-security-bbf80",
  appId: "1:547126597790:web:9dfcd64f82cdf85af6c38f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);