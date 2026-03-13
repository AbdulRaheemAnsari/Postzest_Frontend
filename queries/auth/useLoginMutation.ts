import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { axiosApi } from "@/lib/axios";

export const loginRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const validatedRequest = loginRequestSchema.parse(payload);
      const response = await axiosApi.post("/auth/login", validatedRequest);
      return response.data;
    },
  });
};