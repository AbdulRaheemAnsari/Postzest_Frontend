import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { z } from "zod";
import { axiosApi } from "@/lib/axios";

export const resendOtpRequestSchema = z.object({
  email: z.string(),
});

export type ResendOtpRequest = z.infer<typeof resendOtpRequestSchema>;

export const useResendOtp = (
  options?: UseMutationOptions<Error, ResendOtpRequest>
) => {
  return useMutation<Error, ResendOtpRequest>({
    mutationFn: async (payload) => {
      const validatedRequest = resendOtpRequestSchema.parse(payload);

      const response = await axiosApi.post(
        "/auth/resend-otp",
        validatedRequest
      );

      return response.data;
    },
    onSuccess: (response, ...rest) => {
      options?.onSuccess?.(response, ...rest);
    },
    onError: (error, ...rest) => {
      console.error("Resend OTP failed:", error);
      options?.onError?.(error, ...rest);
    },

    ...options,
  });
};
