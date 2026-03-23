import { z } from 'zod';

export const WebToonCategoryInputSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const WebToonTagInputSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const CreateWebToonInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  totalSeries: z.number(),
  category: WebToonCategoryInputSchema,
  tags: z.array(WebToonTagInputSchema),
});

CreateWebToonInputSchema.refine(data => {
  return true;
});

export const UpdateWebToonInputSchema = CreateWebToonInputSchema.partial();

export type CreateWebToonInput = z.infer<typeof CreateWebToonInputSchema>;
export type UpdateWebToonInput = z.infer<typeof UpdateWebToonInputSchema>;
