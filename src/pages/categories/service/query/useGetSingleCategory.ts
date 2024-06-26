import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetSingleCategory = (id: string) => {
    return useQuery({
        queryKey: ['single-cat',id],
        queryFn: () => request
            .get(`/category/${id}/`)
            .then(res => res.data)
    })
}