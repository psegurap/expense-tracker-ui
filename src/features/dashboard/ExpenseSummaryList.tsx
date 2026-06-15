import type { ExpenseSummaryType } from "../../../types";
import { stringToHexColor } from "../../utils/utils";
export default function ExpenseSummaryList({
    categories,
}: {
    categories: ExpenseSummaryType[];
}) {
    return (
        <ul
            role="list"
            className="w-full grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
        >
            {categories.map((category) => (
                <li
                    key={category.id}
                    className="overflow-hidden rounded-xl outline shadow-sm outline-gray-200"
                >
                    <div
                        style={{
                            backgroundColor: stringToHexColor(category.name),
                        }}
                        className="flex items-center gap-x-4 border-b border-gray-900/5 bg-white p-6"
                    >
                        <div className="size-11 p-2 rounded-lg bg-white ring-1 ring-gray-900/10 flex justify-center items-center shadow-sm">
                            <span
                                style={{
                                    backgroundColor: stringToHexColor(
                                        category.name,
                                    ),
                                }}
                                className="size-7 flex uppercase justify-center items-center rounded font-medium bg-gray-800 shadow text-white"
                            >
                                {category.name.trim().slice(0, 1)}
                            </span>
                        </div>
                        <div className="text-sm/6 font-medium text-white capitalize">
                            {category.name}
                        </div>
                    </div>
                    <dl className="bg-white divide-y divide-gray-100 px-6 py-2 text-sm/6">
                        <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-gray-500">Expenses Logged</dt>
                            <dd className="text-gray-700">
                                {category.expense_count}
                            </dd>
                        </div>
                        <div className="flex justify-between gap-x-4 py-3">
                            <dt className="text-gray-500">Total Spent</dt>
                            <dd className="text-gray-700">
                                ${category.total_spent}
                            </dd>
                        </div>
                    </dl>
                </li>
            ))}
        </ul>
    );
}
