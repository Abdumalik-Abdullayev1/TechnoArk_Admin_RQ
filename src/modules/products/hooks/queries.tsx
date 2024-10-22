import { useQuery } from "@tanstack/react-query";
import { ParamsType } from "@types";
import { getBrandById, getBrandCategoryById, getProduct } from "../service";

// ========= GET PRODUCT ===========
export function useGetProducts(params: ParamsType){
    return useQuery({
        queryKey: ["products", params],
        queryFn: ()=> getProduct(params)
    })
}
// ========= GET BRAND BY CATEGORY_ID ===========
export function useBrandById(id:number) {
    return useQuery({
        queryKey: ["brand", id],
        queryFn: ()=> getBrandById(id)
    })
}
// ========= GET BRAND BY CATEGORY_ID ===========
export function useBrandCategoryById(id:number) {
    return useQuery({
        queryKey: ["brand-category", id],
        queryFn: ()=> getBrandCategoryById(id)
    })
}