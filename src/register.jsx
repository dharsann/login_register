import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import successPage from './successPage';
import bcrypt from 'bcryptjs';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; // Add the Firestore module import

const firebaseConfig = {
  // Your Firebase config object here (you can find this in the Firebase Console)
  apiKey: "AIzaSyDgYJBUmNbnf0evF4SVouoz9yEz2GDTPDA",
  authDomain: "form-d5f26.firebaseapp.com",
  databaseURL: "https://form-d5f26-default-rtdb.firebaseio.com",
  projectId: "form-d5f26",
  storageBucket: "form-d5f26.appspot.com",
  messagingSenderId: "604162368133",
  appId: "1:604162368133:web:9a0b279d53969f624dbfec",
  measurementId: "G-327J70BZV2"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const Registration = (props) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hash the password using bcrypt before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Store the username and hashed password in Firestore
      await firestore.collection('users').add({
        name: name,
        username: username,
        password: hashedPassword,
      });

      console.log('Registration successful!');
      //setShowSuccessPage(true);

      // Reset the input fields after successful registration
      setName('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  // If showSuccessPage is true, redirect to the success page
  if (showSuccessPage) {
    return <successPage message="Registration successful!" />;
  }
  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
        <label htmlFor="email">email</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
  );
};

export default Registration;
