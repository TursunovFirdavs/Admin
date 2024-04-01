import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useCreateBrand = () => {
    return useMutation({
        mutationKey: ['create-brand'],
        mutationFn: (data:FormData) => request
            .post('/brand/', data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(res => res.data)
    })
}