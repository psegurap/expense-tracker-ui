import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Menu, MenuButton } from "@headlessui/react";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/20/solid";

export default function CategoriesListLoading() {
    return (
        <>
            <div className="flex justify-end">
                <div className="-mr-px grid grow sm:grow-0 animate-pulse grid-cols-1 focus-within:relative">
                    <input
                        // id="search_category"
                        name="search_category"
                        type="text"
                        disabled
                        placeholder=""
                        aria-label="Search categories"
                        className="col-start-1 row-start-1 block w-full rounded-l-md bg-gray-100 py-1.5 pr-3 pl-10 text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:pl-9 sm:text-sm/6"
                    />
                    <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
                    />
                </div>
                <button
                    type="button"
                    disabled={true}
                    className="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900"
                >
                    <PlusIcon
                        aria-hidden="true"
                        className="-ml-0.5 size-4 text-gray-400"
                    />
                </button>
            </div>
            <ul
                role="list"
                className="w-full grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 animate-pulse"
            >
                <li className="overflow-hidden rounded-xl outline outline-gray-200">
                    <div className="flex items-center gap-x-4 border-gray-900/5 bg-gray-50 p-6">
                        <div className="size-11 p-2 rounded-lg bg-white flex justify-center items-center"></div>
                        <div className="text-sm/6 font-medium text-gray-900 capitalize h-5 w-36 bg-gray-200 rounded"></div>
                        <Menu as="div" className="relative ml-auto">
                            <MenuButton
                                disabled
                                className="relative block text-gray-300"
                            >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Open options</span>
                                <EllipsisHorizontalIcon
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </MenuButton>
                        </Menu>
                    </div>
                    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
                        <div className="flex flex-col justify-between gap-y-4 py-3">
                            <span className="w-full h-2 bg-gray-200 rounded"></span>
                            <span className="w-full h-2 bg-gray-200 rounded"></span>
                            <span className="w-36 h-2 bg-gray-200 rounded"></span>
                        </div>
                    </dl>
                </li>
            </ul>
        </>
    );
}
