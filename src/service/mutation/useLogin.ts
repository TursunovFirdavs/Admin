import { request } from "../../config/request";
import { useMutation } from "@tanstack/react-query";

type FieldType = {
    phone_number: string;
    password: string;
  };

export const useLogin = () => {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: (data:FieldType) => request
            .post('/api/admin-login/', data)
            .then(res => res.data)

    })
}