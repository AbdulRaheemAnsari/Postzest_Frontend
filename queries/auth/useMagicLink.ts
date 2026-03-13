import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { z } from "zod";
import { axiosApi } from "@/lib/axios";

export const magicLinkRequestSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type MagicLinkRequest = z.infer<typeof magicLinkRequestSchema>;


export const useMagicLinkMutation = () => {
  return useMutation({
    mutationFn: async (payload: MagicLinkRequest) => {
      const validatedRequest = magicLinkRequestSchema.parse(payload);
      const response = await axiosApi.post("/auth/magic-link", validatedRequest);
      console.log("response", response);
      return response.data;
    },
  });
};



export const SetMagicLinkPasswordMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await axiosApi.post("/auth/set-password", payload);
      return response.data;
    },
  });
};