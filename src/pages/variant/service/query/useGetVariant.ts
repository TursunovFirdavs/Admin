import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetVariant = (page?: number) => {
    return useQuery({
        queryKey: ['product-variant', page],
        queryFn: () => request
            .get('/product_variant/', { params: { offset: page, limit: page && 5 } })
            .then(res => {
                return {
                    data: res.data,
                    size: Math.ceil(res.data.count)
                }
            })
    })
}