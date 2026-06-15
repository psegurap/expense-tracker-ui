import { Menu, MenuButton } from "@headlessui/react";
import { EllipsisHorizontalIcon} from "@heroicons/react/20/solid";
export default function ExpenseSummaryListLoading() {
    return (
        <ul
            role="list"
            className="w-full grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 animate-pulse"
        >
            <li className="overflow-hidden rounded-xl outline outline-gray-100">
                <div className="flex items-center gap-x-4 border-gray-900/5 bg-gray-50 p-6">
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
    );
}
