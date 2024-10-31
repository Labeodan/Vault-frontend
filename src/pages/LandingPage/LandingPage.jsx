import styles from './LandingPage.module.scss';
import lineChart from '../../assets/images/line.png';
import barChart from '../../assets/images/bar.png';
import pieChart from '../../assets/images/piechart.png';
import management from "../../assets/images/management.png"
import tracking from "../../assets/images/tracking.png"
import budget from "../../assets/images/budget.png"
import { Link } from 'react-router-dom';


const LandingPage = ({user}) => {
  return (
    <main className={styles.landingPage}>
      <header className={styles.header}>
        <h1>Welcome to Vault</h1>
        <p>Your personal finance assistant to track expenses, manage income, and set budgets with ease.</p>
        <Link to={user ? "/dashboard" : "/auth/signin"}><button className={styles.getStartedButton}>Get Started</button></Link>
      </header>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <h3>Expense Tracking</h3>
          <p>Monitor your expenses effortlessly and make informed financial decisions.</p>
          <div className={styles.chartPlaceholder}>
            <img src={tracking} alt="Line Chart" />
          </div>
        </div>
        <div className={styles.featureCard}>
          <h3>Income Management</h3>
          <p>Keep track of your income streams and stay on top of your finances.</p>
          <div className={styles.chartPlaceholder}>
            <img src={management} alt="Line Chart" />
          </div>
        </div>
        <div className={styles.featureCard}>
          <h3>Budget Setting</h3>
          <p>Set up budgets for various categories and achieve your financial goals.</p>
          <div className={styles.chartPlaceholder}>
            <img src={budget} alt="Line Chart" />
          </div>
        </div>
      </section>

      <section className={styles.interactiveDashboards}>
        <h2>Interactive Dashboards</h2>
        <div className={styles.dashboardCharts}>
          <div className={styles.chartPlaceholder}><img src={lineChart} alt="Line Chart" /></div>
          <div className={styles.chartPlaceholder}><img src={barChart} alt="Bar Chart" /></div>
          <div className={styles.chartPlaceholder}><img src={pieChart} alt="Pie Chart" /></div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
