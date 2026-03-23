import { z } from 'zod';

export const SignupInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  profileImage: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
});

export const SigninInputSchema = z.object({
  username: z.string(),
  password: z.string(),
  rememberMe: z.boolean().nullable().optional(),
});

export const ForgotPasswordInputSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordInputSchema = z.object({
  token: z.string(),
  password: z.string(),
});

export const UpdatePasswordInputSchema = z.object({
    newPassword: z.string(),
    oldPassword: z.string(),
});

SignupInputSchema.refine(data => {
  return true;
});

export type SignupInput = z.infer<typeof SignupInputSchema>;
export type SigninInput = z.infer<typeof SigninInputSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordInputSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordInputSchema>;
export type UpdatePasswordInput = z.infer<typeof UpdatePasswordInputSchema>;
