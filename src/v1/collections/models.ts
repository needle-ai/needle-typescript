import { z } from "zod";

export const SearchCollectionRequestSchema = z.object({
  collection_id: z.string(),
  text: z.string(),
  max_distance: z.number().optional(),
  top_k: z.number().optional(),
});

export type SearchCollectionRequest = z.infer<
  typeof SearchCollectionRequestSchema
>;

export const SearchResultSchema = z.object({
  id: z.string(),
  content: z.string(),
  file_id: z.string(),
});

export type SearchResult = z.infer<typeof SearchResultSchema>;

export const SearchCollectionResponseSchema = z.object({
  result: z.array(SearchResultSchema),
});

export const CreateCollectionRequestSchema = z.object({
  name: z.string().min(1),
  file_ids: z.array(z.string()).nullable().optional(),
  model: z
    .enum(["basilikum-minima", "mate-meta", "tortellini-maxima"])
    .nullable()
    .optional()
    .default("basilikum-minima"),
});

export type CreateCollectionRequest = z.infer<
  typeof CreateCollectionRequestSchema
>;

export const CreateCollectionResponseSchema = z.object({
  result: z.object({}).required(),
});

export type CreateCollectionResponse = z.infer<
  typeof CreateCollectionResponseSchema
>;
