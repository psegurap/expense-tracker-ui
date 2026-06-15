import type { DashboardResponseType, ExpenseResponseType, ExpenseType, FilterDatesType } from "../../types";
import { apiRequest } from "./api";

export default class ExpenseClient {
    static async getExpenses(from: string, to: string): Promise<ExpenseResponseType> {
        return await apiRequest<ExpenseResponseType>("/expenses", {
            method: "POST",
            body: JSON.stringify({
                from,
                to
            }),
        });
    }

    static async getExpensesAndSummary(from: string, to: string): Promise<DashboardResponseType> {
        return await apiRequest<DashboardResponseType>("/expenses_and_summary", {
            method: "POST",
            body: JSON.stringify({
                from,
                to
            }),
        });
    }

    static async createExpense(expense: ExpenseType, dates: FilterDatesType): Promise<DashboardResponseType> {
        return await apiRequest<DashboardResponseType>("/create_expense", {
            method: "POST",
            body: JSON.stringify({
                name: expense.name,
                description: expense.description,
                date: expense.date,
                amount: expense.amount,
                category_id: expense.category_id,
                from: dates.from,
                to: dates.to
            }),
        })
    }

    static async deleteExpense(expense_id: number, dates: FilterDatesType): Promise<DashboardResponseType> {
        return await apiRequest<DashboardResponseType>("/delete_expense", {
            method: "POST",
            body: JSON.stringify({
                expense_id,
                from: dates.from,
                to: dates.to
            }),
        })
    }
}