import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZkIcjDzxAL0_l0JTP_wDgSx0l_3-Fn9o",
  authDomain: "miniprojectedevgeah.firebaseapp.com",
  databaseURL: "https://miniprojectedevgeah-default-rtdb.firebaseio.com",
  projectId: "miniprojectedevgeah",
  storageBucket: "miniprojectedevgeah.appspot.com",
  messagingSenderId: "945375156625",
  appId: "1:945375156625:web:a2fe34d185101bd62fa230",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

let userNm;

const logInBtn = document.getElementById("logInBtn");

logInBtn.addEventListener("click", logInFunction);

function logInFunction(e) {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("user logged");
      window.location.href = "../index.html";
      userNm = user.email;
      localStorage.setItem("userName", userNm);
    })
    .catch((error) => {
      const errorMessage = "invalid email or password";
      alert(errorMessage);
    });
}
