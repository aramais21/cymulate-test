import { Link } from "react-router";
import EmailInput from "./components/EmailInput";
import styles from "./PhishingAttemptCreatePage.module.css";

const PhishingAttemptCreatePage = () => {
  return (
    <div className={styles.container}>
      <h1>Create Attempt</h1>
      <EmailInput />
      <Link to="/">Go to dashboard</Link>
    </div>
  );
};

export default PhishingAttemptCreatePage;
