import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetBrands = () => {
    return useQuery({
        queryKey: ['brands'],
        queryFn: () => request
            .get('/brand/')
            .then(res => res.data)
    })
}