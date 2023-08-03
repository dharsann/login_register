import React, { useState } from "react";
import SuccessPage from "./successPage";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showSuccessPage, setShowSuccessPage] = useState(false);

    const handleSubmit = async(e) => {
        try{
            e.preventDefault();

             // Check if the user exists in the Firebase database
            const usersRef = collection(firestore, "users");
            const querySnapshot = await getDocs(query(usersRef, where("email", "==", email)));

            
        // If the user exists in the database, show the success page
        if (!querySnapshot.empty) {
            setShowSuccessPage(true);
            // Clear the form fields
            setEmail('');
            setPass('');
        } else {
            console.error("User not found. Please check your credentials.");
        }
    }catch (error) {
            console.error("Error logging in:", error.message);
          }
    }
    // If showSuccessPage is true, redirect to the success page
    if (showSuccessPage) {
        return <SuccessPage message="Login successful!" />;
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}