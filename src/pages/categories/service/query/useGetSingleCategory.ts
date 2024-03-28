import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetSingleCategory = (id: any) => {
    return useQuery({
        queryKey: ['single-cat'],
        queryFn: () => request
            .get(`/category/${id}/`)
            .then(res => res.data)
    })
}