import { useContext } from 'react';
import { Expense } from "../../types/types";
import { AppContext } from '../../context/AppContext';
import { deleteExpense } from '../../utils/expense-utils';

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);

  const handleDeleteExpense = (currentExpense: Expense) => {
    deleteExpense(currentExpense.id)
    // Exercise: Remove expense from expenses context array
    const updatedExpenses = expenses.filter(expense => expense.id !== currentExpense.id)
    setExpenses(updatedExpenses);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;