import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { z } from "zod";
import { axiosApi } from "@/lib/axios";

export const otpRequestSchema = z.object({
  email: z.string(),
  otp: z.string().min(6, "OTP must be 6 digits"),
});

export type OtpRequest = z.infer<typeof otpRequestSchema>;

export const useOtpVerify = (
  options?: UseMutationOptions<Error, OtpRequest>
) => {
  return useMutation<Error, OtpRequest>({
    mutationFn: async (payload) => {
      const validatedRequest = otpRequestSchema.parse(payload);

      const response = await axiosApi.post(
        "/auth/verify-otp",
        validatedRequest
      );

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
