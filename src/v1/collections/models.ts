import { z } from "zod";

export const SearchCollectionRequestSchema = z.object({
  collection_id: z.string(),
  text: z.string(),
  top_k: z.number().optional(),
  offset: z.number().optional(),
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
  file_ids: z.array(z.string()).nullish(),
  model: z
    .enum(["basilikum-minima", "mate-meta", "tortellini-maxima"])
    .nullish()
    .default("basilikum-minima"),
});

export type CreateCollectionRequest = z.infer<
  typeof CreateCollectionRequestSchema
>;

export const CreateCollectionResponseSchema = z.object({
  result: z.object({
    name: z.string(),
    id: z.string(),
    created_at: z.string(),
  }),
});

export type CreateCollectionResponse = z.infer<
  typeof CreateCollectionResponseSchema
>;

export const CollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  search_queries: z.number(),
});

export type Collection = z.infer<typeof CollectionSchema>;

export const ListCollectionsResponseSchema = z.object({
  result: z.array(CollectionSchema),
});

export type ListCollectionsResponse = z.infer<
  typeof ListCollectionsResponseSchema
>;

export const GetCollectionDetailsResponseSchema = z.object({
  result: CollectionSchema,
});

export type GetCollectionDetailsResponse = z.infer<
  typeof GetCollectionDetailsResponseSchema
>;

export const CollectionFileStatusSchema = z.enum([
  "pending",
  "indexed",
  "error",
]);

export const CollectionStatsSchema = z.object({
  users: z.number(),
  chunks_count: z.number(),
  characters: z.number(),
  data_stats: z.array(
    z.object({
      status: CollectionFileStatusSchema,
      files: z.number(),
      bytes: z.number().nullish(),
    }),
  ),
});

export type CollectionStats = z.infer<typeof CollectionStatsSchema>;

export const GetCollectionStatsResponseSchema = z.object({
  result: CollectionStatsSchema,
});

export type GetCollectionStatsResponse = z.infer<
  typeof GetCollectionStatsResponseSchema
>;

export const ListCollectionFilesRequestSchema = z.object({
  collection_id: z.string(),
  offset: z.number().nonnegative().optional(),
  limit: z.number().nonnegative().max(500).optional(),
});

export type ListCollectionFilesRequest = z.infer<
  typeof ListCollectionFilesRequestSchema
>;
