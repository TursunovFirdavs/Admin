import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => request
            .get('/product/')
            .then(res => res.data)
    })
}