import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useEffect, useState } from "react";
import type {
    ExpenseSummaryType,
    ExpenseType,
    ExpenseFilterType,
} from "../../../types";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { formatDate, stringToHexColor } from "../../utils/utils";
import ExpenseFilers from "./ExpenseFilters";

export default function ExpensesList({
    expenses,
    categories,
    onHandleDeleteExpense,
}: {
    expenses: ExpenseType[];
    categories: ExpenseSummaryType[];
    onHandleDeleteExpense: (expense_id: number) => void;
}) {
    const [filters, setFilters] = useState<ExpenseFilterType>({
        sort: "",
        categories: [],
    });

    const [sortedExpenses, setSortedExpenses] = useState<ExpenseType[]>([]);

    function handleFilterChange(type: "sort" | "category", new_filter: string) {
        switch (type) {
            case "sort":
                setFilters({
                    categories: filters.categories,
                    sort: new_filter,
                });
                break;
            case "category":
                let temp_categories = [...filters.categories];

                let new_categories;
                if (filters.categories.includes(new_filter)) {
                    new_categories = temp_categories.filter(
                        (category) => category != new_filter,
                    );
                } else {
                    new_categories = [
                        ...new Set([...filters.categories, new_filter]),
                    ];
                }

                setFilters({
                    sort: filters.sort,
                    categories: new_categories,
                });
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        let temp_expenses: ExpenseType[] = [...expenses];
        switch (filters.sort) {
            case "Date":
                temp_expenses = temp_expenses.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime(),
                );
                setSortedExpenses(temp_expenses);
                break;
            case "Category":
                temp_expenses = temp_expenses.sort((a, b) =>
                    (a.category_name ?? "").localeCompare(
                        b.category_name ?? "",
                    ),
                );
                setSortedExpenses(temp_expenses);
                break;
            case "Amount":
                temp_expenses = temp_expenses.sort(
                    (a, b) => parseFloat(b.amount) - parseFloat(a.amount),
                );
                setSortedExpenses(temp_expenses);
                break;
            default:
                setSortedExpenses(temp_expenses);
                break;
        }
    }, [filters.sort, expenses]);

    return (
        <>
            <ExpenseFilers
                categories={categories}
                onHandleFilterChange={handleFilterChange}
                filters={filters}
            />
            <ul role="list" className="space-y-3 mb-5">
                {sortedExpenses.map((expense) => (
                    <li
                        key={expense.id}
                        className={` ${filters.categories.indexOf(expense.category_name ?? "temp") > -1 || filters.categories.length == 0 ? "flex" : "hidden"} flex items-center justify-between gap-x-6 rounded-md bg-white px-6 py-4 shadow-sm`}
                    >
                        <div className="min-w-0">
                            <p className="font-semibold text-gray-900">
                                {expense.name}
                            </p>
                            <div className="mt-1 flex items-center gap-x-2 text-sm">
                                <p className="whitespace-nowrap font-medium text-red-700">
                                    ${expense.amount}
                                </p>
                                <svg
                                    viewBox="0 0 2 2"
                                    className="size-0.5 fill-current"
                                >
                                    <circle r={1} cx={1} cy={1} />
                                </svg>
                                <p className="text-gray-500">
                                    {formatDate(new Date(expense.date))}
                                </p>
                                {expense.description != "" && (
                                    <>
                                        <svg
                                            viewBox="0 0 2 2"
                                            className="size-0.5 fill-current"
                                        >
                                            <circle r={1} cx={1} cy={1} />
                                        </svg>
                                        <p className="truncate text-gray-500">
                                            {expense.description}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-none items-center gap-x-4">
                            <p
                                style={{
                                    backgroundColor: stringToHexColor(
                                        expense.category_name
                                            ? expense.category_name
                                            : "",
                                    ),
                                }}
                                className="mt-0.5 rounded-sm px-2 py-1 text-xs font-medium text-white shadow-sm"
                            >
                                {expense.category_name}
                            </p>
                            <Menu as="div" className="relative flex-none">
                                <MenuButton className="relative block text-gray-500 hover:text-gray-900">
                                    <span className="absolute -inset-2.5" />
                                    <span className="sr-only">
                                        Open options
                                    </span>
                                    <EllipsisVerticalIcon
                                        aria-hidden="true"
                                        className="size-5"
                                    />
                                </MenuButton>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline-1 outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    <MenuItem>
                                        <button
                                            onClick={() =>
                                                onHandleDeleteExpense(
                                                    expense.id,
                                                )
                                            }
                                            className="block w-full text-left px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                        >
                                            Delete
                                            <span className="sr-only">
                                                , {expense.name}
                                            </span>
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
