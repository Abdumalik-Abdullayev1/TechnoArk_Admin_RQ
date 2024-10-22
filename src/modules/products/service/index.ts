import axiosInstance from "@api";
import { ParamsType } from "@types";
import { ProductType } from "../types";


// ========== GET ==========
export const getProduct = async (params: ParamsType) => {
    const response = await axiosInstance.get("products/search", { params })
    return response?.data?.data
}

// ========== CREATE ==========
export const createProduct = async (data: FormData) => {
    const response = await axiosInstance.post("products/create", data)
    return response?.data
}
// ========= GET BRAND BY CATEGORY_ID ===========
export const getBrandById = async (id: number | undefined) => {
    const response = await axiosInstance.get(`brand/category/${id}`)
    return response.data?.data;
};
// ========= GET BRAND CATEGORY BY BRAND_ID ===========
export const getBrandCategoryById = async (id: number | undefined) => {
    const response = await axiosInstance.get(`brand-category/brand/${id}`)
    return response.data?.data;
};

// ========== UPDATE ==========
export const updateProduct = async (data: ProductType) => {
    const { id } = data;
    delete (data as any).id;
    const response = await axiosInstance.patch(`products/update/${id}`, data)
    return response?.data
}

// ========== DELETE ==========
export const deleteProduct = async (id: number) => {
    const response = await axiosInstance.delete(`products/delete/${id}`)
    return response?.data
}