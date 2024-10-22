import axiosInstance from "@api";
import { ParamsType } from "@types";
import { BrandCategoryType } from "../types";

// =============== GET BRAND CATEGORY ============
export const getBrandCategory = async(params: ParamsType) => {
    const response = await axiosInstance.get("brand-category/search", {params})
    return response.data?.data
}

// ============== CREATE BRAND CATEGORY ===========
export const createBrandCategory = async(data: BrandCategoryType) => {
    const response = await axiosInstance.post("brand-category/create", data)
    return response?.data
}

// ============== UPDATE BRAND CATEGORY ===========
export const updateBrandCategory = async(data: BrandCategoryType) => {
    const {id} = data
    delete data.id
    delete data.brand_id
    const response = await axiosInstance.patch(`brand-category/update/${id}`)
    return response?.data
}


// =============== DELETE BRAND CATEGORY ==========
export const deleteBrandCategory = async(id: string | number) => {
    const response = await axiosInstance.delete(`brand-category/delete/${id}`)
    return response?.data
}