import { useEffect, useState } from "react";
import { getPhishingAttempts } from "../../api/phishing";
import PhishingTable from "../../components/PhishingTable";
import styles from "./DashboardPage.module.css";
import { IAttempt } from "../../components/PhishingTable/types";
import { Link } from "react-router";

const DashboardPage = () => {
  const [attempts, setAttempts] = useState<IAttempt[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPhishingAttempts();
      setAttempts(data.response);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Phishing Simulation Dashboard</h1>
      <Link to="/create-attempt">Create Attempt</Link>
      <PhishingTable attempts={attempts} />
    </div>
  );
};

export default DashboardPage;
