import React, { useState, useContext } from "react";
import { AppContext } from '../../context/AppContext';
import { Expense } from '../../types/types';
import { createExpense } from "../../utils/expense-utils";
import { v4 as uuidv4 } from 'uuid';

const AddExpenseForm = () => {

  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext);
  // Exercise: Create name and cost to state variables
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const newExpense: Expense = {
      id: uuidv4(), // Generate a unique ID
      description: name,
      cost,
    };

  const expense = createExpense(newExpense);

    setExpenses([...expenses, newExpense]);
    setCost(0)
    setName("")
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            data-testid='expense-name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            data-testid='expense-cost'
            value={cost}
            onChange={(event) => setCost(Number(event.target.value))}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
