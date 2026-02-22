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

const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const answer = document.getElementById("answer").value;

  if (name === "" || answer === "") {
    alert("Fill all fields");
    return;
  }

  try {
    await addDoc(collection(db, "valentine_answers"), {
      name: name,
      answer: answer,
      time: new Date()
    });

    alert("Submitted ❤️");

    document.getElementById("name").value = "";
    document.getElementById("answer").value = "";

  } catch (error) {
    console.error("Error adding document: ", error);
  }
});