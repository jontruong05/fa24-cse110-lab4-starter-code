import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';
import { v4 as uuidv4 } from 'uuid';



test('test expense deletion', () => {
  render(<App />);

  // Create an expense for apples that cost $10
  const itemName = screen.getByTestId('expense-name');
  fireEvent.change(itemName, {target: {value: 'Apples'}});
  const itemCost = screen.getByTestId('expense-cost');
  fireEvent.change(itemCost, {target: {value: 10}})
  const save = screen.getByText('Save');
  fireEvent.click(save);

  // Create an expense for bananas that cost $7
  fireEvent.change(itemName, {target: {value: 'Bananas'}});
  fireEvent.change(itemCost, {target: {value: 7}})
  fireEvent.click(save);

  // Remove apples from the expense list
  const deleteButton = screen.getAllByRole('button', { name: /x/i });
  fireEvent.click(deleteButton[0]);

  // Check that the budget, remaining, and spent quantities are updated accordingly
  const budget = screen.queryByText(/Budget: \$1000/i);
  const remaining = screen.queryByText(/Remaining: \$993/i);
  const spent = screen.queryByText(/Spent so far: \$7/i);
  expect(budget).toBeInTheDocument();
  expect(remaining).toBeInTheDocument();
  expect(spent).toBeInTheDocument();

  // Remove bananas from the expense list
  fireEvent.click(deleteButton[0]);
  expect(budget).toBeInTheDocument();

  // Check that the budget, remaining, and spent quantities are updated accordingly
  const remaining2 = screen.queryByText(/Remaining: \$1000/i);
  const spent2 = screen.queryByText(/Spent so far: \$0/i);
  expect(remaining2).toBeInTheDocument();
  expect(spent2).toBeInTheDocument();
});

test('budget balance verification', () => {
  render(<App />);

  
});

function makeName(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
function randomNumber() {
  // 👇️ Get the number between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (100000 - 0 + 1)) + 0;
}

describe("Create an Expense", () => {
  test("Checking Expenses", () => {
    render(<App/>)
    const nameInput = screen.getByTestId('expense-name')
    const costInput = screen.getByTestId('expense-cost')
    const createExpense = screen.getByText("Save")
    
    const name = makeName(10)
    const cost = randomNumber()
    fireEvent.change(nameInput, {target:{value:name}})
    fireEvent.change(costInput, {target:{value:cost}})
    fireEvent.click(createExpense)


    const newName = screen.getByText(name)
    const newCost = screen.getByText('$' + cost)
   
    expect(newName).toBeInTheDocument()
    expect(newCost).toBeInTheDocument()
  })

  test("Checking Budget, Remaining, and TotalExpenses", ()=>{
    render(<App/>)

    const nameInput = screen.getByTestId('expense-name')
    const costInput = screen.getByTestId('expense-cost')
    const createExpense = screen.getByText("Save")

    const name = makeName(10)
    const cost = randomNumber()
    fireEvent.change(nameInput, {target:{value:name}})
    fireEvent.change(costInput, {target:{value:cost}})

    fireEvent.click(createExpense)


    const budget = screen.getByTestId('budget').innerHTML.substring(9);
    const remaining = screen.getByTestId('remaining').innerHTML.substring(12)
    const totalExpenses = screen.getByTestId('totalExpenses').innerHTML.substring(15)
    expect(Number(remaining)).toBe(Number(budget) - Number(totalExpenses))
  })
})
