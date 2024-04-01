import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetSingleBrand = (id: string) => {
    return useQuery({
        queryKey: ['single-brand',id],
        queryFn: () => request
            .get(`/brand/${id}/`)
            .then(res => res.data)
    })
}