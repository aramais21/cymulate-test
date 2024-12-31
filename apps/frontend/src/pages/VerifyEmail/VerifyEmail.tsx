import { useNavigate, useParams, } from 'react-router';
import styles from "./VerifyEmail.module.css";
import { useEffect } from 'react';
import { verifyEmail } from '../../api/auth';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const callback = async () => {
      try {
        await verifyEmail(token || '');
        navigate("/");
      } catch (error) {
        console.error("Registration failed", error);
      }
    }
    callback();
  }, [token]);

  return <div className={styles.container}>Email Verification Page</div>;
};

export default VerifyEmail;
