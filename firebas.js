 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
 import { getFirestore  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
 import {getStorage } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

 const firebaseConfig = {
  apiKey: "AIzaSyC8VX82HMCKAUVaC-Ti743Mjsu9iCHXP9M",
  authDomain: "twohourse-64770.firebaseapp.com",
  projectId: "twohourse-64770",
  storageBucket: "twohourse-64770.appspot.com",
  messagingSenderId: "697179270123",
  appId: "1:697179270123:web:427c6687fd174c86ce07ae",
  measurementId: "G-4B9680FY6S"
};

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth=getAuth(app)
 const db=getFirestore (app)
 const storage = getStorage();
 export {app,auth,db,storage}