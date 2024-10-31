import styles from './BudgetCreate.module.scss'

import BudgetForm from '../../components/BudgetForm/BudgetForm'

const BudgetCreate = () => {
  return (
    <main className={styles.container}>
      <BudgetForm />
    </main>
  )
}

export default BudgetCreate