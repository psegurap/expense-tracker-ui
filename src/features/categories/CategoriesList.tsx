import type { CategoryType } from "../../../types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { stringToHexColor } from "../../utils/utils";

export default function CategoriesList({
    categories,
    onHandleEditButton,
    onhandleDeleteButton,
}: {
    categories: CategoryType[];
    onHandleEditButton: (category: CategoryType) => void;
    onhandleDeleteButton: (category: CategoryType) => void;
}) {
    return (
        <>
            {categories.length > 0 ? (
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
                                    backgroundColor: stringToHexColor(
                                        category.name,
                                    ),
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
                                        className="size-7 flex uppercase justify-center items-center rounded font-medium shadow text-white"
                                    >
                                        {category.name.trim().slice(0, 1)}
                                    </span>
                                </div>
                                <div className="text-sm/6 font-medium text-white capitalize">
                                    {category.name}
                                </div>
                                <Menu as="div" className="relative ml-auto">
                                    <MenuButton className="relative block text-white hover:text-gray-500">
                                        <span className="absolute -inset-2.5" />
                                        <span className="sr-only">
                                            Open options
                                        </span>
                                        <EllipsisHorizontalIcon
                                            aria-hidden="true"
                                            className="size-5"
                                        />
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline-1 outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <MenuItem>
                                            <button
                                                type="button"
                                                className="block w-full text-start px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                                onClick={() =>
                                                    onHandleEditButton(category)
                                                }
                                            >
                                                <span className="sr-only">
                                                    , {category.name}
                                                </span>
                                                Edit
                                            </button>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                type="button"
                                                className="block w-full text-start px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                                onClick={() =>
                                                    onhandleDeleteButton(
                                                        category,
                                                    )
                                                }
                                            >
                                                <span className="sr-only">
                                                    , {category.name}
                                                </span>
                                                Delete
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                            <dl className="bg-white divide-y divide-gray-100 px-6 py-2 text-sm/6">
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-gray-500">
                                        {category.description}
                                    </dt>
                                </div>
                            </dl>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center mt-4 text-base text-gray-500">
                    You don’t have any categories yet. Use the “Add New” button
                    to get started.
                </p>
            )}
        </>
    );
}
