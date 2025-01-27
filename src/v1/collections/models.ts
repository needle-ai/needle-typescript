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
  result: z.array(z.object({})),
});

export type AddFilesToCollectionResponse = z.infer<
  typeof AddFilesToCollectionResponseSchema
>;

export const CollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string().optional(),
  model: z.string().optional(),
  owner_id: z.string().optional(),
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
  offset: z.number().default(0),
  limit: z.number().min(1).max(500).default(100),
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

export interface FolderConfig {
  path: string;
  recursive: boolean;
}

export interface CreateLocalConnectorRequest {
  os: string;
  mac_address: string;
  device_name: string;
  collection_id: string;
  folders: FolderConfig[];
}

export const CreateLocalConnectorResponseSchema = z.object({
  result: z.object({
    id: z.string(),
    os: z.string(),
    mac_address: z.string(),
    device_name: z.string(),
    collection_id: z.string(),
    folders: z.array(
      z.object({
        path: z.string(),
        recursive: z.boolean(),
      }),
    ),
    created_at: z.string(),
    updated_at: z.string(),
  }),
});

export type CreateLocalConnectorResponse = z.infer<
  typeof CreateLocalConnectorResponseSchema
>;

export interface DeleteCollectionFilesRequest {
  collection_id: string;
  file_ids: string[];
}

export const DeleteCollectionFilesResponseSchema = z.object({
  result: z.object({
    deleted_file_ids: z.array(z.string()),
  }),
});

export type DeleteCollectionFilesResponse = z.infer<
  typeof DeleteCollectionFilesResponseSchema
>;
