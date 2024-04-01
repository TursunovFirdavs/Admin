import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useCreateProduct = () => {
    return useMutation({
        mutationKey: ['create-product'],
        mutationFn: (data:FormData) => request
            .post('/product/', data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(res => res.data)
    })
}