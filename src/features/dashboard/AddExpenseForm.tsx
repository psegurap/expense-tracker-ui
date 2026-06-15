import type {
    AddExpenseType,
    CategoryType,
    CategoryResponseType,
    ExpenseType,
    ToastType,
    ExpenseSummaryType,
    DashboardResponseType,
    FilterDatesType,
} from "../../../types";
import { Transition } from "@headlessui/react";
import ExpenseClient from "../../services/expenses.client";
import CategoryClient from "../../services/categories.client";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router";
import { formatDateInput } from "../../utils/utils";

export default function AddExpenseForm({
    form_values,
    onSetFormValues,
    onHandleUpdateDashboard,
    toast,
    dates,
}: {
    form_values: AddExpenseType;
    onSetFormValues: (values: AddExpenseType) => void;
    onHandleUpdateDashboard: (
        expenses: ExpenseType[],
        summary: ExpenseSummaryType[],
    ) => void;
    toast: { show: ToastType; setToast: (value: ToastType) => void };
    dates: FilterDatesType;
}) {
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const formKey = useRef(Math.random());

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res: CategoryResponseType =
                    await CategoryClient.getCategories();

                setCategories(res.categories);
            } catch (error) {
                setErrorMessages([
                    "There was an error retrieving your categories. Try again later.",
                ]);
            }
        };

        fetchCategories();
    }, []);

    const yesterday = new Date(new Date());
    yesterday.setDate(yesterday.getDate());

    function hanldleFormChange(
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
        type: string,
    ) {
        switch (type) {
            case "name":
                onSetFormValues({
                    ...form_values,
                    name: event.target.value,
                });
                break;

            case "amount":
                onSetFormValues({
                    ...form_values,
                    amount: event.target.value,
                });
                break;

            case "date":
                onSetFormValues({
                    ...form_values,
                    date: event.target.value,
                });
                break;

            case "description":
                onSetFormValues({
                    ...form_values,
                    description: event.target.value,
                });
                break;
            case "category":
                onSetFormValues({
                    ...form_values,
                    category_id: parseInt(event.target.value),
                });
                break;
            default:
                break;
        }
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        let errors = [];

        if (form_values.name.trim() == "") {
            errors.push("Please enter an expense name.");
        }

        if (form_values.amount == "" || isNaN(form_values.amount.trim())) {
            errors.push("Please enter a valid amount.");
        }

        if (
            new Date(form_values.date.trim())
                .toString()
                .toLowerCase()
                .indexOf("invalid date") != -1
        ) {
            errors.push("Please select a date.");
        }

        if (form_values.category_id == 0) {
            errors.push("Please select a valid category.");
        }

        if (errors.length > 0) {
            setErrorMessages(errors);
        } else {
            const response: DashboardResponseType =
                await ExpenseClient.createExpense(
                    {
                        id: 0,
                        name: form_values.name,
                        description: form_values.description,
                        date: form_values.date,
                        amount: form_values.amount,
                        category_id: form_values.category_id,
                    },
                    dates,
                );
            if (response.status == 200) {
                toast.setToast({
                    active: true,
                    message: "The expense was successfully added.",
                    type: "success",
                });
                onHandleUpdateDashboard(response.expenses, response.summary);
                onSetFormValues({
                    ...form_values,
                    category_id: 0,
                    name: "",
                    description: "",
                    date: formatDateInput(yesterday),
                    amount: 0,
                });
                formKey.current = Math.random();
            } else {
                if (response.message) {
                    setErrorMessages([response.message]);
                } else {
                    setErrorMessages([
                        "There was an unexpected error. Please try again later.",
                    ]);
                }
            }
        }
    }

    function handleCloseForm() {
        onSetFormValues({
            ...form_values,
            category_id: 0,
            isOpen: false,
            name: "",
            description: "",
            date: "",
            amount: 0,
        });
    }

    return (
        <Transition key={formKey.current} show={form_values.isOpen}>
            <div className="flex justify-center col-span-1 sm:col-span-2 mb-6">
                <form
                    onSubmit={handleSubmit}
                    className="transition-all relative ease-in data-closed:opacity-0 w-full sm:max-w-3xl bg-white shadow-xs outline outline-gray-900/5 rounded-lg sm:rounded-xl md:col-span-2"
                >
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="expense-name"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Name{" "}
                                    <span className="text-xs text-gray-500">
                                        (Required)
                                    </span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="expense-name"
                                        name="expense-name"
                                        type="text"
                                        value={form_values.name}
                                        onChange={(event) =>
                                            hanldleFormChange(event, "name")
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="expense-amount"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Amount{" "}
                                    <span className="text-xs text-gray-500">
                                        (Required)
                                    </span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="expense-amount"
                                        name="expense-amount"
                                        value={form_values.amount}
                                        type="number"
                                        onChange={(event) =>
                                            hanldleFormChange(event, "amount")
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="expense-date"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Date{" "}
                                    <span className="text-xs text-gray-500">
                                        (Required)
                                    </span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="expense-date"
                                        name="expense-date"
                                        value={form_values.date}
                                        type="date"
                                        max={formatDateInput(yesterday)}
                                        onChange={(event) =>
                                            hanldleFormChange(event, "date")
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="">
                                <label
                                    htmlFor="category"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Category{" "}
                                    <span className="text-xs text-gray-500">
                                        (Required)
                                    </span>
                                </label>
                                <div className="mt-2  grid grid-cols-1">
                                    <select
                                        id="category"
                                        name="category"
                                        onChange={(event) =>
                                            hanldleFormChange(event, "category")
                                        }
                                        defaultValue={0}
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                                    >
                                        <option disabled value={0}>
                                            Choose a category
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1 sm:col-span-2">
                                <label
                                    htmlFor="expense-description"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Description{" "}
                                    <span className="text-xs text-gray-500">
                                        (Optional)
                                    </span>
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="expense-description"
                                        name="expense-description"
                                        value={form_values.description}
                                        rows={3}
                                        onChange={(event) =>
                                            hanldleFormChange(
                                                event,
                                                "description",
                                            )
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            {errorMessages.length > 0 && (
                                <ul className="list-disc list-inside mb-2 text-red-500 -mt-2 ml-2 col-span-1 sm:col-span-2">
                                    {errorMessages.map((message, msgInd) => (
                                        <li key={msgInd} className="text-sm">
                                            {message}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-x-4 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <button
                            type="button"
                            data-autofocus="true"
                            onClick={handleCloseForm}
                            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                        >
                            Save
                        </button>
                    </div>
                    {categories.length == 0 && (
                        <div className="absolute inset-0 bg-gray-800/50 rounded flex items-center justify-center">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Before adding an expense,
                                                    you’ll need to create a
                                                    category. Categories help
                                                    group your transactions so
                                                    you can better organize,
                                                    filter, and understand your
                                                    spending habits.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <Link
                                        className="inline-flex ml-0 sm:ml-3 items-center gap-x-1.5 rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                                        to="/categories"
                                    >
                                        Go to categories
                                        <ArrowRightIcon
                                            aria-hidden="true"
                                            className="-mr-0.5 size-5"
                                        />
                                    </Link>
                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={handleCloseForm}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </Transition>
    );
}
