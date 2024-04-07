import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useEditAttribute = () => {
    return useMutation({
        mutationKey: ['edit-attribute'],
        mutationFn: (data: any) => request
            .patch(`/api/category_edit/`, data)
            .then(res => res.data)
    })
}