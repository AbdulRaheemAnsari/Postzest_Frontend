import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { z } from "zod";
import { axiosApi } from "@/lib/axios";

export const useLogout = (options?: UseMutationOptions<Error>) => {
  return useMutation<Error>({
    mutationFn: async () => {
      const response = await axiosApi.post("/auth/logout", {});
      return response;
    },
    onSuccess: (response, ...rest) => {
      options?.onSuccess?.(response, ...rest);
    },
    onError: (error, ...rest) => {
      console.error("Login failed:", error);
      options?.onError?.(error, ...rest);
    },

    ...options,
  });
};
