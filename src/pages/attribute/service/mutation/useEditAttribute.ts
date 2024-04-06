import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useEditAttribute = (id: string) => {
    return useMutation({
        mutationKey: ['edit-attribute', id],
        mutationFn: (data: any) => request
            .put(`/attribute/${id}/`, {attributes: [data]},)
            .then(res => res.data)
    })
}