import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useEditCategory = (id:any) => {
    return useMutation({
        mutationKey: ['edit-category'],
        mutationFn: (data: FormData) => request
            .put(`/category/${id}/`, data, {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(res => res.data)
    })
}