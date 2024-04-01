import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteBrand = () => {
    return useMutation({
        mutationKey: ['delete-brand', 'brands'],
        mutationFn: (id: string) => request
            .delete(`/brand/${id}/`)
            .then(res => res.data)
    })
}