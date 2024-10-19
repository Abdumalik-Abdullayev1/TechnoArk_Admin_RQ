import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrand, deleteBrand, updateBrand } from "../service";
import { BrandType } from "../types";
import { Notification } from "../../../utils/notifications";

// ========== CREATE BRAND ==========
export function useCreateBrand(){
    const querClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: BrandType) => createBrand(data),
        onSuccess: async (response) => {
            Notification({
                type: "success",
                message: response?.message
            })
        },
        onSettled: async(_, error) => {
            if(error){
                Notification({
                    type: "error",
                    message: error?.message,
                })
            }else{
                await querClient.invalidateQueries({ queryKey: ['brand'] })
            }
        }
    })
}

// ========== UPDATE BRAND ==========
export function useUpdateBrand(){
    const querClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: BrandType) => updateBrand(data),
        onSuccess: async (response) => {
            Notification({
                type: "success",
                message: response?.message
            })
        },
        onSettled: async(_, error, variables) => {
            if(error){
                Notification({
                    type: "error",
                    message: error?.message,
                })
            }else{
                await querClient.invalidateQueries({ queryKey: ['brand', {id: variables.category_id}] })
            }
        }
    })
}

// ========== DELETE BRAND ==========
export function useDeleteBrand(){
    const querClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: number) => deleteBrand(id),
        onSuccess: async (response) => {
            Notification({
                type: "success",
                message: response?.message
            })
        },
        onSettled: async(_, error) => {
            if(error){
                Notification({
                    type: "error",
                    message: error?.message,
                })
            }else{
                await querClient.invalidateQueries({ queryKey: ['brand'] })
            }
        }
    })
}