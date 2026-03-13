import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosApi } from "../../lib/axios";

export const useGetLinkedinAuthUrl = () => {
    return useQuery({
        queryKey: ["linkedinAuthUrl"],
        queryFn: async () => {
            const { data } = await axiosApi.get("/social/linkedin/auth-url");
            return data.url;
        },
        enabled: false, // Don't fetch on mount, only when clicking connect
    });
};

export const useConnectLinkedin = () => {
    return useMutation({
        mutationFn: async (code: string) => {
            const { data } = await axiosApi.post("/social/linkedin/connect", { code });
            return data;
        },
    });
};
