import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct } from "../service";
import { Notification } from "../../../utils/notifications";

// ========= CREATE ===========
export function useCreateProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: FormData) => createProduct(data),
        onSuccess: (response) => {
            Notification({
                type: 'success',
                message: response?.message
            })
        },
        onSettled: (_, error) => {
            if (error) {
                Notification({
                    type: "error",
                    message: error?.message
                })
            } else {
                queryClient.invalidateQueries({ queryKey: ["product"] })
            }
        }
    })
}

// ========= UPDATE ===========
// export function useUpdateBrand() {
//     const queryClient = useQueryClient()
//    return useMutation({
//     mutationFn: (data: BrandType)=> updateBrand(data),
//     onSuccess:(response)=>{
//         Notification('success', response?.message)
//     },
//     onSettled:(_,error)=>{
//         if(error){
//             Notification("error", error.message)
//         }else {
//             queryClient.invalidateQueries({queryKey: ["brand"]})
//         }
//     }
//    })
// }

// ========= DELETE ===========
export function useDeleteProduct() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: (response) => {
            Notification({
                type: 'success',
                message: response?.message
            })
        },
        onSettled: (_, error) => {
            if (error) {
                Notification({
                    type: "error",
                    message: error?.message
                })
            } else {
                queryClient.invalidateQueries({ queryKey: ["product"] })
            }
        }
    });
}