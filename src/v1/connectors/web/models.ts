import { z } from "zod";

const WebFileSchema = z.object({
  url: z.string().url(),
  name: z.string(),
});

export const WebConnectorSchema = z.object({
  id: z.string(),
  type: z.literal("web"),
  files: z.array(WebFileSchema),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CreateWebConnectorRequestSchema = z.object({
  collection_ids: z.array(z.string()),
  name: z.string(),
  cron_job: z.string(),
  timezone: z.string(),
  files: z.array(WebFileSchema),
});

export type CreateWebConnectorRequest = z.infer<
  typeof CreateWebConnectorRequestSchema
>;

export const CreateWebConnectorResponseSchema = z.object({
  result: WebConnectorSchema,
});

export type CreateWebConnectorResponse = z.infer<
  typeof CreateWebConnectorResponseSchema
>;

export const GetWebConnectorResponseSchema = z.object({
  result: WebConnectorSchema,
});

export type GetWebConnectorResponse = z.infer<
  typeof GetWebConnectorResponseSchema
>;
