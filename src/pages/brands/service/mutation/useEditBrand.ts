import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useEditBrand = (id: string) => {
    return useMutation({
        mutationKey: ['edit-brand', id],
        mutationFn: (data: FormData) => request
            .put(`/brand/${id}/`, data, {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(res => res.data)
    })
}