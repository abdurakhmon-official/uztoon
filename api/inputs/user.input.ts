import { z } from 'zod';

export const CreateUserInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  profileImage: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
});

CreateUserInputSchema.refine(data => {
  return true;
});

export const UpdateUserInputSchema = CreateUserInputSchema.partial();

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>;
