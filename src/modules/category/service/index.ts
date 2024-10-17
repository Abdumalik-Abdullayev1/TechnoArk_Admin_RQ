import axiosInstance from "@api";
import { ParamsType } from "@types";
import { CategoryType } from "../types";

// ============= GET ============
export const getCategory = async (params: ParamsType) => {
    return await axiosInstance.get("category/search", { params })
}

// ============= CREATE ============
export const createCategory = async (data: CategoryType) => {
    const response =  await axiosInstance.post("category/create", data)
    return response?.data
}

// ============= UPDATE ============
export const updateCategory = async (data: CategoryType) => {
    const { id } = data;
    delete (data as any).id;
    const response = await axiosInstance.patch(`category/update/${id}`, data)
    return response?.data
}

// ============== DELETE ===============
export const deleteCategory =async (id: number) => {
    const response = await axiosInstance.delete(`category/delete/${id}`)
    return response?.data
}