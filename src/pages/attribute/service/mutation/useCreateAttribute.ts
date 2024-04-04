import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useCreateAttribute = () => {
    return useMutation({
        mutationKey: ['create-attribute'],
        mutationFn: (data:FormData) => request
            .post('/attribute/', data,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            .then(res => res.data)
    })
}