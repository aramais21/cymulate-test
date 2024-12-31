import { IAttempt } from "./types";
import styles from "./PhishingTable.module.css";

const PhishingTable = ({ attempts }: { attempts: IAttempt[] }) => {
  console.log(attempts, 'attempts')
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Email</th>
          <th>Status</th>
          <th>Clicked At</th>
        </tr>
      </thead>
      <tbody>
        {attempts.map((attempt, index) => (
          <tr key={index}>
            <td>{attempt.email}</td>
            <td>Link was {attempt.isClicked ? '' : 'not'} clicked</td>
            <td>{attempt?.clickedAt || 'Not Clicked'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PhishingTable;
