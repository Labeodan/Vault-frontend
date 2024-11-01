import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './BudgetForm.module.scss';

// Services
import { getBudget, createBudget, updateBudget} from '../../services/budgets';

const BudgetForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    category: '',
    startDate: new Date,
    endDate: new Date,
  });
  const [errors, setErrors] = useState({});

  // ! Location Variables
  const navigate = useNavigate();
  const { budgetId } = useParams();

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const { data } = await getBudget(budgetId);
        setFormData({
          name: data.name,
          target: data.target,
          category: data.category.name,  // Assumes category is populated with the name
          // startDate: data.startDate,
          // endDate: data.endDate,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (budgetId) fetchBudget();
  }, [budgetId]);

  // ! Event Handlers
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (budgetId) {
        res = await updateBudget(budgetId, formData);
      } else {
        res = await createBudget(formData);
      }
      navigate(`/dashboard`);
    } catch (error) {
        setErrors(error.response.data);
        console.log(error.response.data);
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>{ budgetId ? 'Update' : 'Create' } Budget</h1>
        
        <label htmlFor="name-input">Name</label>
        <input
          required
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className='error'>{errors.name}</p>}

        <label htmlFor="target-input">Target Amount</label>
        <input
          required
          type="number"
          name="target"
          id="target-input"
          value={formData.target}
          onChange={handleChange}
        />
        {errors.target && <p className='error'>{errors.target}</p>}

        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Food">Food</option>
          <option value="Salary">Salary</option>
          <option value="Utilities">Utilities</option>
          <option value="Gift">Gift</option>
          <option value="Health">Health</option>
          <option value="Transport">Transport</option>
          <option value="None"  >None</option>
        </select>
        {errors.category && <p className='error'>{errors.category}</p>}

        {/* <label htmlFor="start-date-input">Start Date</label>
        <input
          required
          type="date"
          name="startDate"
          id="start-date-input"
          value={formData.startDate}
          onChange={handleChange}
        />
        {errors.startDate && <p className='error'>{errors.startDate}</p>}

        <label htmlFor="end-date-input">End Date</label>
        <input
          required
          type="date"
          name="endDate"
          id="end-date-input"
          value={formData.endDate}
          onChange={handleChange}
        />
        {errors.endDate && <p className='error'>{errors.endDate}</p>} */}

        {/* Generic error message */}
        {errors.errorMessage && <p className='error'>{errors.errorMessage}</p>}

        <button type="submit">{ budgetId ? 'Update' : 'Create' } Budget</button>
      </form>
    </main>
  );
};

export default BudgetForm;
