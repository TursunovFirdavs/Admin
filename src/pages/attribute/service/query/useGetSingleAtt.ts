import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetSingleAttribute = (id: string) => {
    return useQuery({
        queryKey: ['single-attribute',id],
        queryFn: () => request
            .get(`/attribute/${id}/`)
            .then(res => res.data)
    })
}