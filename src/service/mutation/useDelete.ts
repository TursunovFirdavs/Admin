import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useDelete = () => {
    return useMutation({
        mutationKey: ['delete', 'category'],
        mutationFn: (id: string) => request
            .delete(`${id}`)
            .then(res => res.data)
    })
}