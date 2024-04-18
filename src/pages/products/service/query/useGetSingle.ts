import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetSingleProduct = (id:string) => {
    return useQuery({
        queryKey: ['single-product', id],
        queryFn: () => request
            .get(`/product/${id}/`)
            .then(res => res.data)
    })
}