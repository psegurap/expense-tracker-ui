import type { CategoryResponseType, CategoryType } from "../../types";
import { apiRequest } from "./api";

export default class CategoryClient {
    static async getCategories(): Promise<CategoryResponseType> {
        return await apiRequest<CategoryResponseType>("/categories");
    }

    static async createCategry(category: CategoryType): Promise<CategoryResponseType> {
        return await apiRequest<CategoryResponseType>("/create_category", {
            method: "POST",
            body: JSON.stringify({
                name: category.name,
                description: category.description,
            }),
        })
    }

    static async updateCategory(category: CategoryType): Promise<CategoryResponseType> {
        return await apiRequest<CategoryResponseType>("/update_category", {
            method: "POST",
            body: JSON.stringify({
                id: category.id,
                name: category.name,
                description: category.description,
            }),
        })
    }

    static async deleteCategory(category: CategoryType): Promise<CategoryResponseType> {
        return await apiRequest<CategoryResponseType>("/delete_category", {
            method: "POST",
            body: JSON.stringify({
                category_id: category.id,
            }),
        })
    }
}