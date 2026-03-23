import { z } from 'zod';

export const BasicSearchSchema = z
  .object({
    size: z.coerce.number().nullable().default(10),
    page: z.coerce.number().nullable().default(1),
    search: z.string().optional().nullable(),

    sort: z.string().default('createdAt'),
    direction: z.string().default('desc'),
  })
  .transform(({ size, page, sort, direction }) => {
    return {
      size: size,
      page: page,
      skip: (page - 1) * size,
      sorting: { [sort]: direction },
    };
  });

BasicSearchSchema.refine(data => {
  return true;
});

export type BasicSearch = z.infer<typeof BasicSearchSchema>;
