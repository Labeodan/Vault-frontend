
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Financial Overview -</h1>
      </header>

      <section className={styles.summary}>
        <div className={styles.summaryCard}>
          <h2>Total expenses</h2>
          <p className={styles.amount}>182</p>
          <button className={styles.button}>New expense</button>
        </div>
        <div className={styles.summaryCard}>
          <h2>Total income</h2>
          <p className={styles.amount}>14</p>
          <button className={styles.button}>Add income</button>
        </div>
      </section>

      <section className={styles.charts}>
        <div className={styles.chart}>
          <h3>Total revenue</h3>
          {/* Placeholder for chart */}
          <div className={styles.chartPlaceholder}>Chart</div>
        </div>
        <div className={styles.chart}>
          <h3>Income status</h3>
          {/* Placeholder for chart */}
          <div className={styles.chartPlaceholder}>Chart</div>
        </div>
      </section>

      <section className={styles.transactionCategories}>
        <h3>Transaction categories</h3>
        <div className={styles.categoryGrid}>
          <div className={styles.categoryCard}>Investments</div>
          <div className={styles.categoryCard}>Expenses</div>
          <div className={styles.categoryCard}>Income</div>
          <div className={styles.categoryCard}>Clients</div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
