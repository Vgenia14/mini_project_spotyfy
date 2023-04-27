import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import dotenv from "dotenv";

dotenv.config();
console.log(process.env.APIKEY);
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

const userName = document.getElementById("username");
const password = document.getElementById("password");
const button = document.querySelector("button");

// console.log(database);

let userNm;
button.onclick = (e) => {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, userName.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      set(ref(database, "users/" + user.uid), {
        email: userName.value,
        password: password.value,
      })
        .then(() => {
          alert("user created");
          window.location.href = "../index.html";
          userNm = user.email;
          localStorage.setItem("userName", userNm);
        })
        .catch((error) => {
          alert("error");
          console.log(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = "invalid email or password";
      alert(errorMessage);
      console.log(error);
    });
};

// button.onclick = (e) => {
//   const user = {
//     email: userName.value,
//     password: password.value,
//   };
//   fetch("https://miniprojectedevgeah-default-rtdb.firebaseio.com/new.json", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((r) => alert("!!!!!!"))
//     .catch((e) => alert(e, e.message));
// };
