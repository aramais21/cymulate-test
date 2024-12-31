import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { register as registerApi } from "../../api/auth";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (data.password !== data.confirm_password) {
        return  window.alert('Passwords should match');
      }
      await registerApi(data.email, data.password, data.name, data.username);
      navigate("/");
    } catch (error: any) {
      window.alert(error?.response?.data?.message)
      console.error("Registration failed", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Register</h1>
        <input
          {...register("name")}
          className={styles.input}
          type="text"
          placeholder="Name"
          required
        />
        <input
          {...register("username")}
          className={styles.input}
          type="text"
          placeholder="Username"
          required
        />
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
        <input
          {...register("confirm_password")}
          className={styles.input}
          type="password"
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Register</button>
        <Link to="/">Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
