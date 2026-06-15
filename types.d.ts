// src/types/auth.ts

export type UserType = {
  email: string
}

export type AuthResponseType = {
  token: string
  status: number
  message: ?string
}

export type CategoryType = {
  id: number;
  name: string;
  description: string
}

export type CategoryResponseType = {
  status: number;
  message: ?string
  categories: CategoryType[]
}

export type CategoriesDialogStatus = "edit" | "new" | "close";

export type ToastType = {
  message: string;
  type: "success" | "warning" | "error";
  active: boolean;
};

export type FilterDatesType = {
  from: string,
  to: string
}

export type ExpenseType = {
  id: number;
  category_id: number;
  category_name?: string;
  name: string;
  amount: float;
  date: string;
  description: string
}

export type ExpenseResponseType = {
  status: number;
  message: ?string
  expenses: ExpenseType[]
}

export type ExpenseSummaryType = {
  id: number,
  name: string,
  expense_count: number,
  total_spent: number
}

export type DashboardResponseType = {
  status: number;
  message: ?string
  expenses: ExpenseType[]
  summary: ExpenseSummaryType[]
}

export type AddExpenseType = {
  isOpen: boolean,
  name: string
  amount: float
  date: string
  description: string
  category_id: number
}

export type ExpenseFilterType = {
  sort: string,
  categories: string[]
}