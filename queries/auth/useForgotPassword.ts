import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { z } from "zod";
import { axiosApi } from "@/lib/axios";
import { resetPasswordSchema } from "@/app/auth/reset-password/page";

export const forgotPasswordRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type ForgotPasswordRequest = z.infer<typeof forgotPasswordRequestSchema>;


export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordRequest) => {
      const response = await axiosApi.post("/auth/forgot-password", payload);
      return response.data;
    },
  });
};


export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (payload: z.infer<typeof resetPasswordSchema>) => {
      const response = await axiosApi.post("/auth/reset-password", payload);
      return response.data;
    },
  });
};