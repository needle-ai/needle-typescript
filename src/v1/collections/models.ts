import { z } from "zod";
import { ConnectorSchema } from "../connectors/models";

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
  result: z.object({
    name: z.string(),
    id: z.string(),
    created_at: z.string(),
  }),
});

export type CreateCollectionResponse = z.infer<
  typeof CreateCollectionResponseSchema
>;

export const AddFilesToCollectionFileSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export type AddFilesToCollectionFile = z.infer<
  typeof AddFilesToCollectionFileSchema
>;

export const AddFilesToCollectionRequestSchema = z.object({
  collection_id: z.string(),
  files: z.array(AddFilesToCollectionFileSchema),
});

export type AddFilesToCollectionRequest = z.infer<
  typeof AddFilesToCollectionRequestSchema
>;

export const AddFilesToCollectionResponseSchema = z.object({
  result: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
      status: z.enum(["pending", "indexed", "error"]),
      created_at: z.string(),
      user_id: z.string(),
      url: z.string().url(),
      size: z.number().nullable(),
      md5_hash: z.string().nullable(),
      connector_id: z.string().nullable(),
      error: z.string().nullable().optional(),
      connector: ConnectorSchema.nullable().optional(),
    }),
  ),
});

export type AddFilesToCollectionResponse = z.infer<
  typeof AddFilesToCollectionResponseSchema
>;

export const CollectionSchema = z.object({
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

export const CollectionStatsSchema = z.object({
  total_files: z.number().optional(),
  total_chunks: z.number().optional(),
  last_updated_at: z.string().optional(),
});

export type CollectionStats = z.infer<typeof CollectionStatsSchema>;

export const GetCollectionStatsResponseSchema = z.object({
  result: CollectionStatsSchema,
});

export type GetCollectionStatsResponse = z.infer<
  typeof GetCollectionStatsResponseSchema
>;

export const CollectionFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number().optional(),
  content_type: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CollectionFile = z.infer<typeof CollectionFileSchema>;

export const ListCollectionFilesRequestSchema = z.object({
  collection_id: z.string(),
  offset: z.number().optional(),
  limit: z.number().min(1).max(500).optional(),
});

export type ListCollectionFilesRequest = z.infer<
  typeof ListCollectionFilesRequestSchema
>;

export const ListCollectionFilesResponseSchema = z.object({
  result: z.array(CollectionFileSchema),
});

export type ListCollectionFilesResponse = z.infer<
  typeof ListCollectionFilesResponseSchema
>;

export const DeleteCollectionFilesRequestSchema = z.object({
  collection_id: z.string(),
  file_ids: z.array(z.string()).min(1).max(100),
});

export type DeleteCollectionFilesRequest = z.infer<
  typeof DeleteCollectionFilesRequestSchema
>;
