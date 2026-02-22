import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6zHebKldtOhmsmujoJ981Y8FAJtjDIvE",
  authDomain: "valentine-questions.firebaseapp.com",
  projectId: "valentine-questions",
  storageBucket: "valentine-questions.firebasestorage.app",
  messagingSenderId: "192981325674",
  appId: "1:192981325674:web:92816f47eb1a368e01b713",
  measurementId: "G-9JEMVQWEPT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let answers = {};

window.nextPage = function(pageNumber) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page" + pageNumber).classList.add("active");

  if(pageNumber === 3) {
    answers.q1 = document.getElementById("q1").value;
  }

  if(pageNumber === 4) {
    answers.q2 = document.getElementById("q2").value;
  }
}

window.saveAnswer = async function(response) {
  answers.q3 = response;

  try {
    await addDoc(collection(db, "valentine_answers"), {
      answers: answers,
      time: new Date()
    });

    nextPage(5);

  } catch (error) {
    console.error("Error:", error);
  }
};

/* 😈 Make NO button run away */
const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseover", () => {
  noBtn.style.position = "absolute";
  noBtn.style.top = Math.random() * 300 + "px";
  noBtn.style.left = Math.random() * 300 + "px";
});