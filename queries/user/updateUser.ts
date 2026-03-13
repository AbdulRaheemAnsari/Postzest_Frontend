import { axiosApi } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosApi.get("/auth/profile");
      return response.data.data;
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await axiosApi.patch("/auth/profile", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useUpdateAvatar = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await axiosApi.patch("/auth/profile/picture", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};



export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await axiosApi.put("/auth/update-password", payload);
      return response.data;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};