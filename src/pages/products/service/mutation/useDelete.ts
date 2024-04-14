import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteProduct = () => {
    return useMutation({
        mutationKey: ['delete-product'],
        mutationFn: (id: string) => request
            .delete(`/product/${id}/`)
            .then(res => res.data)
    })
}