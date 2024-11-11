import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget } from "../../utils/budget-utils";
import { Button } from "react-bootstrap";

const Budget = () => {

  const {budget, setBudget} = useContext(AppContext);

  useEffect(() => {
    loadBudget();
    }, []);
  
    // Function to load expenses and handle errors
    const loadBudget = async () => {
    try {
      const budget = await fetchBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
    };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div data-testid='budget'>Budget: ${budget}</div>
      <div><Button>Save</Button></div>
    </div>
  );
};

export default Budget;
