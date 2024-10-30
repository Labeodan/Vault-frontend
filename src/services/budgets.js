import axios from './interceptors';

const BUDGETS_BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/budget`;

// * Index - Get all budgets
export const getBudgets = () => {
  return axios.get(BUDGETS_BASE_URL);
};

// * Show - Get a single budget by ID
export const getBudget = (budgetId) => {
  return axios.get(`${BUDGETS_BASE_URL}/${budgetId}`);
};

// * Create - Create a new budget
export const createBudget = (formData) => {
  return axios.post(BUDGETS_BASE_URL, formData);
};

// * Update - Update a budget by ID
export const updateBudget = (budgetId, formData) => {
  return axios.put(`${BUDGETS_BASE_URL}/${budgetId}`, formData);
};

// * Delete - Delete a budget by ID
export const deleteBudget = (budgetId) => {
  return axios.delete(`${BUDGETS_BASE_URL}/${budgetId}`);
};
