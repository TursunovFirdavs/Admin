import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteSub = () => {
    return useMutation({
        mutationKey: ['delete', 'category'],
        mutationFn: (id: string) => request
            .delete(`/category/${id}/`)
            .then(res => res.data)
    })
}