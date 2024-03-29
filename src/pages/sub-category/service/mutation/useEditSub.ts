import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useEditSub = (id: string) => {
    return useMutation({
        mutationKey: ['edit-sub', id],
        mutationFn: (data: FormData) => request
            .put(`/category/${id}/`, data, {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(res => res.data)
    })
}