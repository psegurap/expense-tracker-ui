"use client";

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import type {
    CategoriesDialogStatus,
    CategoryType,
    CategoryResponseType,
} from "../../../types";
import CategoryClient from "../../services/categories.client";

import { useEffect, useState } from "react";

export default function AddEditDialog({
    currentCategory,
    categoryAction,
    status,
    setStatus,
}: {
    currentCategory: CategoryType;
    categoryAction: (response: CategoryResponseType) => void;
    status: CategoriesDialogStatus;
    setStatus: (value: CategoriesDialogStatus) => void;
}) {
    const [category, setCategory] = useState<CategoryType>(currentCategory);
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    useEffect(() => {
        setCategory(currentCategory);
    }, [currentCategory]);

    function handleInputChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: "name" | "description",
    ) {
        if (type == "name") {
            setCategory({
                ...category,
                name: event.target.value,
            });
        } else if (type == "description") {
            setCategory({
                ...category,
                description: event.target.value,
            });
        }
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        let errors = [];

        if (category.name.trim() === "") {
            errors.push("The name is required.");
        }

        if (category.description.trim() === "") {
            errors.push("The description is required.");
        }

        if (errors.length == 0) {
            const results: CategoryResponseType =
                status == "new"
                    ? await CategoryClient.createCategry(category)
                    : await CategoryClient.updateCategory(category);

            if (results.status == 200) {
                categoryAction(results);
                setCategory({
                    id: 0,
                    name: "",
                    description: "",
                });
                setErrorMessage([]);
            } else {
                if (results.message) {
                    setErrorMessage([results.message]);
                } else {
                    setErrorMessage([
                        "There was an unexpected error. Please try again later.",
                    ]);
                }
            }
        } else {
            setErrorMessage(errors);
        }
    }

    return (
        <div>
            <Dialog
                open={status == "edit" || status == "new"}
                onClose={() => setStatus("close")}
                className="relative z-10"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <form onSubmit={(event) => handleSubmit(event)}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="">
                                        <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                                            <DialogTitle
                                                as="h3"
                                                className="text-2xl italic text-center font-medium text-gray-900"
                                            >
                                                {status == "edit"
                                                    ? "Update Category"
                                                    : "Create Category"}
                                            </DialogTitle>
                                            <div className="py-6 space-y-4">
                                                <div>
                                                    <label
                                                        htmlFor="category-name"
                                                        className="block text-sm/6 font-medium text-gray-900"
                                                    >
                                                        Name
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="category-name"
                                                            name="category-name"
                                                            type="text"
                                                            onChange={(event) =>
                                                                handleInputChange(
                                                                    event,
                                                                    "name",
                                                                )
                                                            }
                                                            value={
                                                                category.name
                                                            }
                                                            required
                                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                                                        />
                                                    </div>
                                                    {status == "edit" && (
                                                        <span className="italic capitalize text-sm text-gray-500">
                                                            Current:{" "}
                                                            {
                                                                currentCategory.name
                                                            }
                                                        </span>
                                                    )}
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="category-description"
                                                        className="block text-sm/6 font-medium text-gray-900"
                                                    >
                                                        Description
                                                    </label>
                                                    <div className="mt-2">
                                                        <textarea
                                                            id="category-description"
                                                            name="category-description"
                                                            onChange={(event) =>
                                                                handleInputChange(
                                                                    event,
                                                                    "description",
                                                                )
                                                            }
                                                            value={
                                                                category.description
                                                            }
                                                            rows={3}
                                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>

                                                {errorMessage.length > 0 && (
                                                    <ul className="list-disc list-inside mb-2 text-red-500 -mt-2 ml-2">
                                                        {errorMessage.map(
                                                            (
                                                                message,
                                                                msgInd,
                                                            ) => (
                                                                <li
                                                                    key={msgInd}
                                                                    className="text-sm"
                                                                >
                                                                    {message}
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                                    >
                                        {status == "edit" ? "Update" : "Create"}
                                    </button>
                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={() => setStatus("close")}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
