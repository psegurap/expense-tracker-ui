import type { FilterDatesType } from "../../../types";

import { PlusIcon } from "@heroicons/react/20/solid";

export default function DatesFilterExpenses({
    dates,
    onHandleSetDates,
    onHandleAddExpenseClick,
}: {
    dates: FilterDatesType;
    onHandleSetDates: (dates: FilterDatesType) => void;
    onHandleAddExpenseClick: () => void;
}) {
    function handleDateChange(
        event: React.ChangeEvent<HTMLInputElement>,
        type: "from" | "to",
    ) {
        if (type == "from") {
            onHandleSetDates({
                ...dates,
                from: event.target.value,
            });
        } else if (type == "to") {
            onHandleSetDates({
                ...dates,
                to: event.target.value,
            });
        }
    }

    return (
        <section aria-labelledby="filter-heading" className="pb-6">
            <h2 id="filter-heading" className="sr-only">
                Product filters
            </h2>
            <div className="flex justify-between gap-4 flex-col sm:flex-row">
                <div className="flex w-full gap-4 flex-col sm:flex-row">
                    <div className="flex grow sm:grow-0">
                        <div className="flex shrink-0 items-center rounded-l-sm bg-white px-3 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6">
                            from
                        </div>
                        <input
                            id="from-date"
                            name="from-date"
                            type="date"
                            value={dates.from}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                            ) => handleDateChange(event, "from")}
                            className="-ml-px block w-full grow rounded-r-sm bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                        />
                    </div>
                    <div className="flex grow sm:grow-0">
                        <div className="flex shrink-0 items-center rounded-l-sm bg-white px-3 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6">
                            to
                        </div>
                        <input
                            id="to-date"
                            name="to-date"
                            type="date"
                            value={dates.to}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>,
                            ) => handleDateChange(event, "to")}
                            className="-ml-px block w-full grow rounded-r-sm bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="flex w-full justify-end">
                    {/* <div className="-mr-px grid w-full md:w-auto grow sm:grow-0 grid-cols-1 focus-within:relative">
                        <input
                            id="search_expense"
                            name="search_expense"
                            type="text"
                            // value={search}
                            // onChange={(
                            //     event: React.ChangeEvent<HTMLInputElement>,
                            // ) => setSearch(event.target.value)}
                            placeholder="Search expenses"
                            aria-label="Search expenses"
                            className="col-start-1 row-start-1 block w-full rounded-l-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:pl-9 sm:text-sm/6"
                        />
                        <MagnifyingGlassIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
                        />
                    </div> */}
                    <button
                        type="button"
                        onClick={onHandleAddExpenseClick}
                        className="flex shrink-0 w-full sm:w-auto items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600"
                    >
                        <PlusIcon
                            aria-hidden="true"
                            className="-ml-0.5 size-4 text-gray-400"
                        />
                        Add Expense
                    </button>
                </div>
            </div>
        </section>
    );
}
