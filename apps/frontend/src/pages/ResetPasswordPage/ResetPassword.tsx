import React, { useState } from "react";
import styles from "./ResetPasswordPage.module.css";
import { resetPassword } from '../../api/auth';
import { useParams } from 'react-router';

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      await resetPassword(token || '', password)
    } catch (err: any) {
      window.alert(err?.response?.data?.message)
    }
  };

  return (
    <div className={styles.container}>
      <h1>Reset Password</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
