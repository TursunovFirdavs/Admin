import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useEditProduct = (id: string) => {
    return useMutation({
        mutationKey: ['edit-product', id],
        mutationFn: (data: FormData) => request
            .put(`/product/${id}/`, data, {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(res => res.data)
    })
}