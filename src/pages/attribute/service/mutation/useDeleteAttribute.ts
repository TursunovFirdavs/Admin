import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteAttribut = () => {
    return useMutation({
        mutationKey: ['delete'],
        mutationFn: (id: string) => request
            .delete(`/attribute/${id}/`)
            .then(res => res.data)
    })
}