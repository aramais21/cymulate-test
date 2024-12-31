import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => (
  <div className={styles.container}>
    <h1>404 - Page Not Found</h1>
    <Link to="/">Go to Login</Link>
  </div>
);

export default NotFoundPage;
