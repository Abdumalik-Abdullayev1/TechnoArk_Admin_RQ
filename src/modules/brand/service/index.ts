import axiosInstance from "@api";
import { ParamsType } from "@types";
import { BrandType } from "../types";

// ============== GET BRAND =============
export const getBrand = async (params: ParamsType) =>{
    return await axiosInstance.get("brand/search", {params})
}

// ============ CREATE ============
export const createBrand = async (data: BrandType) => {
    const response = await axiosInstance.post("brands/create", data)
    return response?.data
}

// ============ UPDATE ============
export const updateBrand = async (data: BrandType) => {
    const { id } = data;
    delete ( data as any ).id;
    const response = await axiosInstance.patch(`brands/update/${id}`, data)
    return response?.data
}

// ============== DELETE ===========
export const deleteBrand = async (id: number) => {
    const response = await axiosInstance.delete(`brands/delete/${id}`)
    return response?.data
}