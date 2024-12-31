import { useAuth } from "../../hooks/useAuth";
import { login as loginApi } from "../../api/auth";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await loginApi(data.email, data.password);
      login(response.response.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <input
          {...register("email")}
          className={styles.input}
          type="email"
          placeholder="Email"
          required
        />
        <input
          {...register("password")}
          className={styles.input}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <Link to="/register">Don't have an account? Register here</Link>
        <Link to="/forgot-password">Forgot Password</Link>
      </form>
    </div>
  );
};

export default LoginPage;
