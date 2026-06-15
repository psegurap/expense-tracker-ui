import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function CategoriesFilter({
    search,
    setSearch,
    openDialog,
}: {
    search: string;
    setSearch: (new_value: string) => void;
    openDialog: () => void;
}) {
    return (
        <div className="flex justify-end">
            <div className="-mr-px grid grow sm:grow-0 grid-cols-1 focus-within:relative">
                <input
                    id="search_category"
                    name="search_category"
                    type="text"
                    value={search}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Search categories"
                    aria-label="Search categories"
                    className="col-start-1 row-start-1 block w-full rounded-l-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:pl-9 sm:text-sm/6"
                />
                <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
                />
            </div>
            <button
                type="button"
                onClick={openDialog}
                className="flex shrink-0 items-center gap-x-1.5 rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-50 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600"
            >
                <PlusIcon
                    aria-hidden="true"
                    className="-ml-0.5 size-4 text-gray-400"
                />
                Add New
            </button>
        </div>
    );
}
