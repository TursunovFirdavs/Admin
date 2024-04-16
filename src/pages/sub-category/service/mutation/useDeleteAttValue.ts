import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteSub = () => {
    return useMutation({
        mutationKey: ['att-value'],
        mutationFn: (id: string) => request
            .delete(`/attribute-value/${id}/`)
            .then(res => res.data)
    })
}