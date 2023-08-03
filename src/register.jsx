import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import SuccessPage from "./successPage";

const firebaseConfig = {
  // Your Firebase config
  apiKey: "AIzaSyDgYJBUmNbnf0evF4SVouoz9yEz2GDTPDA",
  authDomain: "form-d5f26.firebaseapp.com",
  databaseURL: "https://form-d5f26-default-rtdb.firebaseio.com",
  projectId: "form-d5f26",
  storageBucket: "form-d5f26.appspot.com",
  messagingSenderId: "604162368133",
  appId: "1:604162368133:web:9a0b279d53969f624dbfec",
  measurementId: "G-327J70BZV2"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add the user data to the "users" collection
      await addDoc(collection(firestore, "users"), {
        name: name,
        email: email,
        pass: pass
      });
      setShowSuccessPage(true);

      // Display the alert after form submission
      const alert = document.querySelector(".alert");
      alert.style.display = "block";

      // Hide the alert after 2 seconds
      setTimeout(() => {
        alert.style.display = "none";
      }, 2000);

      // Reset the form fields using state variables
      setName('');
      setEmail('');
      setPass('');
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
  // If showSuccessPage is true, redirect to the success page
  if (showSuccessPage) {
    return <SuccessPage message="Registration successful!" />;
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
        <label htmlFor="email">email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
  );
};
