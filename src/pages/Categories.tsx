import { useEffect, useState } from "react";
import type {
    CategoryType,
    CategoryResponseType,
    CategoriesDialogStatus,
    ToastType,
} from "../../types";
import CategoriesList from "../features/categories/CategoriesList";
import CategoryClient from "../services/categories.client";
import CategoriesListLoading from "../features/categories/CategoriesListLoading";
import CategoriesFilter from "../features/categories/CategoriesFilter";
import AddEditDialog from "../features/categories/AddEditDialog";
import NotificationToast from "../components/NotificationToast";
import ProtectedHeader from "../components/protected/Header";

export default function Categories() {
    const [categories, setCategories] = useState<CategoryType[] | null>(null);

    const [filteredCategories, setFilteredCategories] = useState<
        CategoryType[]
    >([]);
    const [search, setSearch] = useState<string>("");
    const [dialogStatus, setDialogStatus] =
        useState<CategoriesDialogStatus>("close");

    const [currentCategory, setCategory] = useState<CategoryType>({
        id: 0,
        name: "",
        description: "",
    });

    const [showToast, setShowToast] = useState<ToastType>({
        message: "message",
        type: "warning",
        active: false,
    });

    function handleCategoryAction(response: CategoryResponseType) {
        setCategories(response.categories);
        setDialogStatus("close");
    }

    function handleAddNewButton() {
        setDialogStatus("new");
        setCategory({ id: 0, name: "", description: "" });
    }

    function handleEditButton(category: CategoryType) {
        setDialogStatus("edit");
        setCategory(category);
    }

    async function handleDeleteButton(category: CategoryType) {
        const results: CategoryResponseType =
            await CategoryClient.deleteCategory(category);

        if (results.status == 200) {
            setCategories(results.categories);
        } else {
            if (results.message) {
                setShowToast({
                    active: true,
                    message: results.message,
                    type: "error",
                });
            } else {
                setShowToast({
                    active: true,
                    message:
                        "There was an unexpected error. Please try again later.",
                    type: "error",
                });
            }
        }
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res: CategoryResponseType =
                    await CategoryClient.getCategories();

                setCategories(res.categories);
            } catch (error) {
                setShowToast({
                    active: true,
                    message:
                        "There was an error retrieving your categories. Try again later.",
                    type: "error",
                });
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const temp_categories: CategoryType[] | Promise<CategoryType[]> = [];

        if (categories != null && categories.length > 0) {
            categories.forEach((category) => {
                if (
                    category.name
                        .trim()
                        .toLowerCase()
                        .indexOf(search.trim().toLowerCase()) != -1 ||
                    category.description
                        .trim()
                        .toLowerCase()
                        .indexOf(search.trim().toLowerCase()) != -1
                ) {
                    temp_categories.push(category);
                }
            });
        }

        setFilteredCategories(temp_categories);
    }, [search, categories]);

    return (
        <>
            <ProtectedHeader
                header_info={{
                    title: "Categories",
                    description:
                        "Create and manage categories to better organize your expenses and quickly filter where your money is going.",
                }}
            />
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Your content */}
                <div className="flex flex-col gap-4">
                    <CategoriesFilter
                        openDialog={handleAddNewButton}
                        search={search}
                        setSearch={setSearch}
                    />
                    {categories != null ? (
                        <CategoriesList
                            categories={filteredCategories}
                            onHandleEditButton={handleEditButton}
                            onhandleDeleteButton={handleDeleteButton}
                        />
                    ) : (
                        <CategoriesListLoading />
                    )}
                    <AddEditDialog
                        currentCategory={currentCategory}
                        categoryAction={handleCategoryAction}
                        status={dialogStatus}
                        setStatus={setDialogStatus}
                    />
                    <NotificationToast
                        setShow={setShowToast}
                        show={showToast}
                    />
                </div>
            </main>
        </>
    );
}
