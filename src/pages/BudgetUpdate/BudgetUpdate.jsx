import styles from './BudgetUpdate.module.scss'

import BudgetForm from '../../components/BudgetForm/BudgetForm'

const BudgetUpdate = () => {
  return (
    <main className={styles.container}>
      <BudgetForm />
    </main>
  )
}

export default BudgetUpdate