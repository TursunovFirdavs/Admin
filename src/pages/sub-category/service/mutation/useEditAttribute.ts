import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useEditAttribute = () => {
    return useMutation({
        mutationKey: ['edit-attribute'],
        mutationFn: (data: any) => request
            .put(`/api/category_edit/`, {attributes: [data]},)
            .then(res => res.data)
    })
}