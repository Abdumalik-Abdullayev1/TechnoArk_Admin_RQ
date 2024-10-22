import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Notification } from "../../../utils/notifications";
import { createBrandCategory, updateBrandCategory, deleteBrandCategory } from "../service";
import { BrandCategoryType } from "../types";

// ========== CREATE =========
export function useCreateBrandCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: BrandCategoryType) => createBrandCategory(data),
        onSuccess: (response) => {
            Notification({
                type: "success",
                message: response?.message,
            })
        },
        onSettled: (_, error) => {
            if (error) {
                Notification({
                    type: "error",
                    message: error?.message,
                })
            } else {
                queryClient.invalidateQueries({ queryKey: ["brand-category"] })
            }
        }
    })
}

// ========== UPDATE =========
export function useUpdateBrandCategory() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: BrandCategoryType) => updateBrandCategory(data),
        onSuccess: (response) => {
            Notification({
                type: "success",
                message: response?.message,
            });
        },
        onSettled: (_, error) => {
            if (error) {
                Notification({
                    type: "error",
                    message: error?.message,
                });
            } else {
                queryClient.invalidateQueries({ queryKey: ["brand-category"] })
            }
        }
    })
}

// ========== DELETE =========
export function useDeleteBrandCategory() {
    const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string | number) => deleteBrandCategory(id),
    onSuccess:(response)=>{
        Notification({
            type: "success",
            message: response?.message,
        });
    },
    onSettled:(_,error)=>{
        if(error){
            Notification({
                    type: "error",
                    message: error?.message,
                });
        }else {
            queryClient.invalidateQueries({queryKey: ["brand-category"]})
        }
    }
  });
}