import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import bcrypt from 'bcryptjs';
import successPage from './successPage';
import 'firebase/compat/auth';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve the user document from Firestore based on the provided username
      const querySnapshot = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

      if (querySnapshot.empty) {
        setLoginError('User not found. Please check your username.');
        return;
      }

      const userDocument = querySnapshot.docs[0].data();
      const hashedPassword = userDocument.password;

      // Compare the provided password with the hashed password from Firestore
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (!passwordMatch) {
        setLoginError('Invalid password. Please try again.');
        return;
      }

      // Authentication successful, perform your login logic here...
      console.log('Login successful!');

      // Reset the input fields after successful login
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('An error occurred during login. Please try again later.');
    }
  };
  // If showSuccessPage is true, redirect to the success page
  if (showSuccessPage) {
    return <successPage message="Login successful!" />;
  }

  return (
    <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
    </div>
)
}
export default Login;
