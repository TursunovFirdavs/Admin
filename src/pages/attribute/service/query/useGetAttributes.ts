import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetAttributes = () => {
    return useQuery({
        queryKey: ['attributes'],
        queryFn: () => request
            .get('/attribute/')
            .then(res => res.data)
    })
}