import { API_BASE_URL } from "../constants/constants";
import { Expense } from "../types/types";

// Function to get budget from the backend. Method: GET
export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
    	method: "GET",
	});

    if (!response.ok) {
        throw new Error("Failed to fetch budget");
    }

    const data = await response.json();
    return data.budget;
};

// Function to update the budget in the backend. Method: PUT
// export const updateBudget = async (budget: number): Promise<number> => {
//     const response = await fetch(`${API_BASE_URL}/budget`, {
//     	method: "GET",
// 	});
// };