import React, { useState } from "react";
import { sendPhishingEmail } from "../../../../api/phishing";
import styles from "./EmailInput.module.css";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendPhishingEmail(email);
      alert("Phishing email sent successfully!");
    } catch (error) {
      console.error("Failed to send phishing email", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="email"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Phishing Email"}
      </button>
    </form>
  );
};

export default EmailInput;
