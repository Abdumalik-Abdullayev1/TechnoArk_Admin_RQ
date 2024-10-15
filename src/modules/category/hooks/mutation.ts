import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../service";
import { CategoryType } from "../types";

//================ CREATE CATEGORY ============
export function useCreateCategory (){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async(data: CategoryType) => createCategory (data),
        onSuccess: async(data) => {
            console.log(data);
        },
        onSettled: async(_,error) => {
            if(error){
                //  notification error
            }else{
                queryClient.invalidateQueries({queryKey: ["category"]})
            }
        }
    })
}