import styles from "./Spinner.module.css";

const Spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.loading}></div>
  </div>
);

export default Spinner;
