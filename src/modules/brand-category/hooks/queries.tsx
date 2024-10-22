import { useQuery } from "@tanstack/react-query";
import { getBrandCategory } from "../service";
import { ParamsType } from "@types";

export function useGetBrandCategory(params: ParamsType){
    return useQuery({
        queryKey: ["brand-category", params],
        queryFn: ()=> getBrandCategory(params)
    })
}