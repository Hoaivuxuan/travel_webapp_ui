import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4eRfCnfdsMooXFArVAeOw4NUXdVvEHZE",
  authDomain: "travel-web-7b510.firebaseapp.com",
  projectId: "travel-web-7b510",
  storageBucket: "travel-web-7b510.appspot.com",
  messagingSenderId: "831160782464",
  appId: "1:831160782464:web:562969b038071a3b436065",
  measurementId: "G-SGEN8CJTYT"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };
