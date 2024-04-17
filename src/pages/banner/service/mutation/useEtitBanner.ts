import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useEditBanner = (id: string) => {
    return useMutation({
        mutationKey: ['edit-banner', id],
        mutationFn: (data: FormData) => request
            .put(`/banner/${id}/`, data, {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(res => res.data)
    })
}