import { z } from 'zod';

export const SerieTagInputSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const SerieImageInputSchema = z.object({
  order: z.number(),
  image: z.string(),
  new: z.boolean(),
});

export const CreateSerieInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  serie: z.number(),
  images: z.array(SerieImageInputSchema),
  tags: z.array(SerieTagInputSchema),
});

CreateSerieInputSchema.refine(data => {
  return true;
});

export const UpdateSerieInputSchema = CreateSerieInputSchema.partial();

export type CreateSerieInput = z.infer<typeof CreateSerieInputSchema>;
export type UpdateSerieInput = z.infer<typeof UpdateSerieInputSchema>;
