import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetSub = (page?: number) => {
    return useQuery({
        queryKey: ['sub-category', page],
        queryFn: () => request
            .get('/api/subcategory/', { params: { offset: page, limit: page && 5 } })
            .then(res => {
                return {
                    data: res.data,
                    size: Math.ceil(res.data.count)
                }
            })
    })
}