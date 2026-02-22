import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
const storage = getStorage(app);


// 🧠 Store Answers
let answers = {};


// 📄 Page Navigation
window.nextPage = function(pageNumber) {

  // Save Q1
  if (pageNumber === 3) {
    answers.q1 = document.getElementById("q1").value.trim();
    if (!answers.q1) {
      alert("Answer the question 😏");
      return;
    }
  }

  // Save Q2
  if (pageNumber === 4) {
    answers.q2 = document.getElementById("q2").value.trim();
    if (!answers.q2) {
      alert("Don't skip this one 😌");
      return;
    }
  }

  // 🚨 Selfie Mandatory Check
  if (pageNumber === 5) {
    const fileInput = document.getElementById("selfie");
    if (!fileInput.files.length) {
      alert("Selfie is mandatory 😘");
      return;
    }
  }

  // Hide all pages
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  // Show next page
  document.getElementById("page" + pageNumber).classList.add("active");
};


// 📸 Selfie Preview
const selfieInput = document.getElementById("selfie");

if (selfieInput) {
  selfieInput.addEventListener("change", function (e) {

    const file = e.target.files[0];
    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      alert("Only images allowed 😅");
      selfieInput.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      const preview = document.getElementById("preview");
      if (preview) {
        preview.src = reader.result;
        preview.style.display = "block";
      }
    };

    reader.readAsDataURL(file);
  });
}


// 😈 Make NO button run away
setTimeout(() => {
  const noBtn = document.getElementById("noBtn");

  if (noBtn) {
    noBtn.addEventListener("mouseover", () => {
      noBtn.style.position = "absolute";
      noBtn.style.top = Math.random() * 300 + "px";
      noBtn.style.left = Math.random() * 300 + "px";
    });
  }
}, 500);


// 💖 Final Save Function
window.saveAnswer = async function(response) {

  answers.q3 = response;

  const file = document.getElementById("selfie").files[0];

  try {

    // 📤 Upload Selfie to Firebase Storage
    const storageRef = ref(storage, "valentine_selfies/" + Date.now() + ".jpg");

    await uploadBytes(storageRef, file);

    const imageUrl = await getDownloadURL(storageRef);

    // 🗄 Save Everything to Firestore
    await addDoc(collection(db, "valentine_answers"), {
      answers: answers,
      selfie: imageUrl,
      time: serverTimestamp()
    });

    // 🎉 Show Final Page
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById("page6").classList.add("active");

  } catch (error) {
    console.error("Error saving data:", error);
    alert("Something went wrong 😢 Try again.");
  }
};