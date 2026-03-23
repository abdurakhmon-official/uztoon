import { z } from 'zod';

export const ReviewCreateInputSchema = z.object({
  review: z.string(),
});

ReviewCreateInputSchema.refine(data => {
  return true;
});

export type ReviewCreateInput = z.infer<typeof ReviewCreateInputSchema>;
