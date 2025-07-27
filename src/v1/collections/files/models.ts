import { z } from "zod";

export const CollectionFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.number().optional(),
  content_type: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CollectionFile = z.infer<typeof CollectionFileSchema>;

///////////////////////////////
/// Add Files to Collection ///
///////////////////////////////
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
      size: z.number().nullish(),
      md5_hash: z.string().nullish(),
      error: z.string().nullish(),
    }),
  ),
});

export type AddFilesToCollectionResponse = z.infer<
  typeof AddFilesToCollectionResponseSchema
>;

/////////////////////////////
/// List Collection Files ///
/////////////////////////////
export const ListCollectionFilesResponseSchema = z.object({
  result: z.array(CollectionFileSchema),
});

export type ListCollectionFilesResponse = z.infer<
  typeof ListCollectionFilesResponseSchema
>;

////////////////////////////////
/// Delete Collection Files ////
/////////////////////////////////
export const DeleteCollectionFilesRequestSchema = z.object({
  collection_id: z.string(),
  file_ids: z.array(z.string()).min(1).max(100),
});

export type DeleteCollectionFilesRequest = z.infer<
  typeof DeleteCollectionFilesRequestSchema
>;
