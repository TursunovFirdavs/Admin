import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteAttribute = () => {
    return useMutation({
        mutationKey: ['sub-category'],
        mutationFn: (id: string) => request
            .delete(`/attribute/${id}/`)
            .then(res => res.data)
    })
}