import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useCreateBanner = () => {
    return useMutation({
        mutationKey: ['create-banner'],
        mutationFn: (data: any) => request
            .post('/banner/', data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(res => res.data)
    })
}