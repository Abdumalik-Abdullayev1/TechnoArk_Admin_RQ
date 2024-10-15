import axiosInstance from "@api";
import { ParamsType } from "@types";
import { CategoryType } from "../types";

// ============= GET ============
export async function getCategory(params: ParamsType){
    return await axiosInstance.get("category/search", {params})
}


// ============= CREATE ============
export async function createCategory(data: CategoryType){
    return await axiosInstance.post("category/create", data)
}