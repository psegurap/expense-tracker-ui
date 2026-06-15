import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import type { ExpenseFilterType, ExpenseSummaryType } from "../../../types";

const sortOptions = [
    { name: "Date" },
    { name: "Amount" },
    { name: "Category" },
];

export default function ExpenseFilers({
    categories,
    onHandleFilterChange,
    filters,
}: {
    categories: ExpenseSummaryType[];

    onHandleFilterChange: (type: "sort" | "category", filter: string) => void;
    filters: ExpenseFilterType;
}) {
    // const activeCategoriesLength = filters.categories.filter(
    //     (category) => category.active,
    // ).length;

    return (
        <div className="flex items-center justify-between gap-x-3 px-1 mt-5 py-3 border-t-1 border-gray-200">
            <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex capitalize justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort By {filters.sort}
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                    <div className="py-1">
                        {sortOptions.map((option) => (
                            <MenuItem key={option.name}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        onHandleFilterChange(
                                            "sort",
                                            option.name,
                                        )
                                    }
                                    className={`${filters.sort.toLowerCase() == option.name.toLowerCase() && "bg-gray-50"} block w-full text-left px-4 py-2 text-sm font-medium text-gray-900 data-focus:bg-gray-100 data-focus:outline-hidden`}
                                >
                                    {option.name}
                                </button>
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Menu>
            <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <span>Filter By Category</span>
                    {filters.categories.length > 0 && (
                        <span className="ml-1.5 rounded-sm bg-gray-200 px-1.5 py-0.5 text-xs font-semibold text-gray-700 tabular-nums">
                            {filters.categories.length}
                        </span>
                    )}
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                    <div className="py-1">
                        <form className="space-y-3 py-2">
                            {categories.map((category, index) => (
                                <div key={index} className="flex gap-3 px-4">
                                    <div className="flex h-5 shrink-0 items-center">
                                        <div className="group grid size-4 grid-cols-1">
                                            <input
                                                defaultValue={category.id}
                                                id={`filter-${category.id}-${index}`}
                                                name={`${category.id}`}
                                                type="checkbox"
                                                checked={
                                                    filters.categories.indexOf(
                                                        category.name,
                                                    ) > -1
                                                }
                                                onChange={() =>
                                                    onHandleFilterChange(
                                                        "category",
                                                        category.name,
                                                    )
                                                }
                                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-cyan-600 checked:bg-cyan-600 indeterminate:border-cyan-600 indeterminate:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                            />
                                            <svg
                                                fill="none"
                                                viewBox="0 0 14 14"
                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                            >
                                                <path
                                                    d="M3 8L6 11L11 3.5"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="opacity-0 group-has-checked:opacity-100"
                                                />
                                                <path
                                                    d="M3 7H11"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <label
                                        htmlFor={`filter-${category.id}-${index}`}
                                        className="pr-6 text-sm font-medium whitespace-nowrap text-gray-900"
                                    >
                                        {category.name}
                                    </label>
                                </div>
                            ))}
                            {/* {categories.map((category, index) => (
                            ))} */}
                        </form>
                    </div>
                </MenuItems>
            </Menu>
        </div>
    );
}
