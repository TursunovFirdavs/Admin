import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetBanner = (page?: number) => {
    return useQuery({
        queryKey: ['banner', page],
        queryFn: () => request
            .get('/banner/', { params: { offset: page, limit: page && 5  } })
            .then(res => {
                return {
                    data: res.data,
                    size: Math.ceil(res.data.count)
                }
            })
    })
}