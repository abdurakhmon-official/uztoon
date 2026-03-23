import { z } from 'zod';

export const RateCreateInputSchema = z.object({
  rate: z.number(),
});

RateCreateInputSchema.refine(data => {
  return true;
});

export type RateCreateInput = z.infer<typeof RateCreateInputSchema>;
