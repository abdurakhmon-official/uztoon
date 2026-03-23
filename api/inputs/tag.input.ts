import { z } from 'zod';

export const TagCreateInputSchema = z.object({
  name: z.string(),
});

TagCreateInputSchema.refine(data => {
  return true;
});

export type TagCreateInput = z.infer<typeof TagCreateInputSchema>;
