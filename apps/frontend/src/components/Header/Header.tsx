import React from "react";
import { Link, useNavigate } from "react-router";
import styles from "./Header.module.css";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        PhishSim
      </Link>
      {isAuthenticated ? (
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Dashboard
          </Link>
          <Link to="/create-attempt" className={styles.navLink}>
            Create Attempt
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      ) : null}
    </header>
  );
};

export default Header;
