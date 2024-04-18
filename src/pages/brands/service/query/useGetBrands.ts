import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetBrands = (page: number) => {
    return useQuery({
        queryKey: ['brands', page],
        queryFn: () => request
            .get('/brand/', { params: { offset: page, limit: 5  } })
            .then(res => {
                return {
                    data: res.data,
                    size: Math.ceil(res.data.count)
                }
            })
    })
}