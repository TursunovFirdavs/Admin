import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetCategory = (page?: number) => {
    console.log(page);
    
    return useQuery({
        queryKey: ['category', page],
        queryFn: () => request
            .get('/category/', { params: { offset: page, limit: page && 5 } })
            .then(res => {
                return {
                    data: res.data,
                    size: Math.ceil(res.data.count)
                }
            })
    })
}