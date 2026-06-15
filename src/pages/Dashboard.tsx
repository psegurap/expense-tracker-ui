import { useEffect, useState } from "react";
import type {
    FilterDatesType,
    ExpenseType,
    ToastType,
    AddExpenseType,
    DashboardResponseType,
    ExpenseSummaryType,
} from "../../types";
import ProtectedHeader from "../components/protected/Header";
import DatesFilterExpenses from "../features/dashboard/DatesFilterExpenses";
import ExpenseSummaryListLoading from "../features/dashboard/ExpenseSummaryListLoading";
import ExpenseSummaryList from "../features/dashboard/ExpenseSummaryList";
import ExpenseClient from "../services/expenses.client";
import NotificationToast from "../components/NotificationToast";
import AddExpenseForm from "../features/dashboard/AddExpenseForm";
import ExpensesList from "../features/dashboard/ExpensesList";
import { formatDateInput } from "../utils/utils";

export default function Darhboard() {
    let current_date = new Date();
    const thirtyDaysAgo = new Date(current_date);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [expenses, setExpenses] = useState<ExpenseType[] | null>(null);
    const [expensesSummary, setExpensesSummary] = useState<
        ExpenseSummaryType[] | null
    >(null);
    const [dates, setDates] = useState<FilterDatesType>({
        from: formatDateInput(thirtyDaysAgo),
        to: formatDateInput(current_date),
    });
    const [showToast, setShowToast] = useState<ToastType>({
        message: "message",
        type: "warning",
        active: false,
    });

    const [addExpense, setAddExpense] = useState<AddExpenseType>({
        isOpen: false,
        name: "",
        description: "",
        date: formatDateInput(current_date),
        amount: 0,
        category_id: 0,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res: DashboardResponseType =
                    await ExpenseClient.getExpensesAndSummary(
                        dates.from,
                        dates.to,
                    );

                setExpensesSummary(res.summary);
                setExpenses(res.expenses);
            } catch (error) {
                setShowToast({
                    active: true,
                    message:
                        "There was an error retrieving your expenses. Try again later.",
                    type: "error",
                });
            }
        };

        fetchCategories();
    }, [dates]);

    function handleAddExpenseClick() {
        if (!addExpense.isOpen) {
            setAddExpense({
                ...addExpense,
                isOpen: true,
            });
        }
    }

    function handleUpdateDashboard(
        expenses: ExpenseType[],
        summary: ExpenseSummaryType[],
    ) {
        setExpenses(expenses);
        setExpensesSummary(summary);
    }

    async function handleDeleteExpense(expense_id: number) {
        const response: DashboardResponseType =
            await ExpenseClient.deleteExpense(expense_id, dates);
        if (response.status == 200) {
            setShowToast({
                active: true,
                message: "The expense was successfully removed.",
                type: "success",
            });
            setExpenses(response.expenses);
            setExpensesSummary(response.summary);
        } else {
            if (response.message) {
                setShowToast({
                    active: true,
                    message: response.message,
                    type: "error",
                });
            } else {
                setShowToast({
                    active: true,
                    message:
                        "There was an unexpected error. Please try again later.",
                    type: "error",
                });
            }
        }
    }

    return (
        <>
            <ProtectedHeader
                header_info={{
                    title: "Dashboard",
                    description:
                        "View your expenses, track totals by category, and filter transactions by date or name.",
                }}
            ></ProtectedHeader>
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="">
                    {expensesSummary != null && expenses != null ? (
                        <>
                            <DatesFilterExpenses
                                dates={dates}
                                onHandleSetDates={setDates}
                                onHandleAddExpenseClick={handleAddExpenseClick}
                            />
                            <AddExpenseForm
                                form_values={addExpense}
                                onSetFormValues={setAddExpense}
                                onHandleUpdateDashboard={handleUpdateDashboard}
                                toast={{
                                    show: showToast,
                                    setToast: setShowToast,
                                }}
                                dates={dates}
                            />
                            {expensesSummary.length > 0 ? (
                                <>
                                    <ExpenseSummaryList
                                        categories={expensesSummary}
                                    />
                                    <ExpensesList
                                        expenses={expenses}
                                        categories={expensesSummary}
                                        onHandleDeleteExpense={
                                            handleDeleteExpense
                                        }
                                    />
                                </>
                            ) : (
                                <div className="flex justify-center">
                                    <p className="text-center text-base text-gray-500 text-lg max-w-xl">
                                        There are no expenses to display for the
                                        selected date range. Try adjusting your
                                        filters or add a new expense.
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <ExpenseSummaryListLoading />
                    )}
                </div>
            </main>
            <NotificationToast setShow={setShowToast} show={showToast} />
        </>
    );
}
