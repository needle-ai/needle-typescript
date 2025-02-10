import { z } from "zod";

export const ConnectorFileSchema = z.object({
  type: z.string(),
  id: z.string(),
  name: z.string(),
  created_at: z.string().transform((str) => new Date(str)),
  updated_at: z
    .string()
    .nullable()
    .transform((str) => (str ? new Date(str) : null)),
  user_id: z.string(),
  connector_id: z.string().nullable(),
  url: z.string(),
  size: z.number().nullable(),
  md5_hash: z.string().nullable(),
});

export const ListConnectorFilesResponseSchema = z.object({
  result: z.array(ConnectorFileSchema),
});

export type ListConnectorFilesResponse = z.infer<
  typeof ListConnectorFilesResponseSchema
>;

export const ListConnectorFilesRequestSchema = z.object({
  connector_id: z.string(),
  offset: z.number().nonnegative().optional(),
  limit: z.number().nonnegative().max(500).optional(),
});

export type ListConnectorFilesRequest = z.infer<
  typeof ListConnectorFilesRequestSchema
>;
