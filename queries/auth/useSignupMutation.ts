import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { z } from "zod";
import { axiosApi } from "@/lib/axios";

export const signUpRequestSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Full name must be at least 4 characters long." })
    .max(50, { message: "Full name must be less than 50 characters." }),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(20, { message: "Password must be less than 20 characters." }),
});

export type SignUpRequest = z.infer<typeof signUpRequestSchema>;

export const useSignUpMutation = (
  options?: UseMutationOptions<Error, SignUpRequest>
) => {
  return useMutation<Error, SignUpRequest>({
    mutationFn: async (payload) => {
      const validatedRequest = signUpRequestSchema.parse(payload);
      const response = await axiosApi.post("/auth/signup", validatedRequest);
      return response.data;
    },

    onSuccess: (response, ...rest) => {
      options?.onSuccess?.(response, ...rest);
    },

    onError: (error, ...rest) => {
      console.error("SignUp failed:", error);
      options?.onError?.(error, ...rest);
    },

    ...options,
  });
};
