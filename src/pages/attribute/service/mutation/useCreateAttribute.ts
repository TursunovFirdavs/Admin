import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useCreateAttribute = () => {
    return useMutation({
        mutationKey: ['create-attribute'],
        mutationFn: (data: any) => request
            .post('/attribute/', {attr_list: data})
            .then(res => res.data)
    })
}