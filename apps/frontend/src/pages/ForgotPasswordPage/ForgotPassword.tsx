import React, { useState } from 'react';
import { Link } from 'react-router';

import styles from "./ForgotPasswordPage.module.css";
import { forgotPassword } from '../../api/auth';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await forgotPassword(email);
      alert("Email sent successfully!");
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Reset Password</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        <Link to="/">Log In</Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
