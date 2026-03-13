import { useQuery } from "@tanstack/react-query";
import { axiosApi } from "../../lib/axios";

export const useSocialAccounts = () => {
    return useQuery({
        queryKey: ["socialAccounts"],
        queryFn: async () => {
            const { data } = await axiosApi.get("/social/accounts");
            return data.accounts;
        },
    });
};
