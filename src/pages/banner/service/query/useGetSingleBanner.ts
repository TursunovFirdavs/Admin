import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetSingleBanner = (id: string) => {
    return useQuery({
        queryKey: ['single-banner',id],
        queryFn: () => request
            .get(`/banner/${id}/`)
            .then(res => res.data)
    })
}