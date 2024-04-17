import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteBanner = () => {
    return useMutation({
        mutationKey: ['delete-banner'],
        mutationFn: (id: string) => request
            .delete(`/banner/${id}/`)
            .then(res => res.data)
    })
}