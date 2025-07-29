// Import required Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBHWynQfAoW2LzsLgWZemh2bUYdGoTb9WY",
  authDomain: "travel-7e777.firebaseapp.com",
  projectId: "travel-7e777",
  storageBucket: "travel-7e777.appspot.com", // corrected from .firebasestorage.app
  messagingSenderId: "807289708650",
  appId: "1:807289708650:web:85563023502c89e977aa13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Handle form submission
document.getElementById("emailForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();

  if (email && validateEmail(email)) {
    try {
      await addDoc(collection(db, "subscribers"), {
        email: email,
        timestamp: new Date()
      });
      alert("🎉 Thank you for subscribing!");
      emailInput.value = ""; // Clear input field
    } catch (error) {
      console.error("❌ Error saving email:", error);
      alert("⚠️ Something went wrong. Please try again.");
    }
  } else {
    alert("❗ Please enter a valid email address.");
  }
});
