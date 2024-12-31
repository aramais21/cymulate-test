import { useNavigate, useParams, useSearchParams } from 'react-router';
import styles from "./VerifyEmail.module.css";
import { useEffect } from 'react';
import { register as registerApi, verifyEmail } from '../../api/auth';

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
