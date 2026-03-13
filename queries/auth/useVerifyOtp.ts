import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { z } from "zod";
import { axiosApi } from "@/lib/axios";

export const otpRequestSchema = z.object({
 email: z.string().optional(), // Make email optional
  otp: z.string().min(4, "OTP must be 4 digits"),
});

export type OtpRequest = z.infer<typeof otpRequestSchema>;


export const useOtpVerify = () => {
  return useMutation({
    mutationFn: async (payload: OtpRequest) => {
      const validatedRequest = otpRequestSchema.parse(payload);
      const response = await axiosApi.post("/auth/verify-otp", validatedRequest);
      return response.data;
    },
  });
};