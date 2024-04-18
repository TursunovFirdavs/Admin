import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetProducts = (page?: number) => {
    return useQuery({
        queryKey: ['products', page],
        queryFn: () => request
            .get('/product/', { params: { offset: page, limit: page && 5  } })
            .then(res => {
                return {
                    data: res.data, 
                    size: Math.ceil(res.data.count)
                }
            })
    })
}