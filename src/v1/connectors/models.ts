import { z } from "zod";

export const FolderConfigSchema = z.object({
  path: z.string(),
  recursive: z.boolean(),
});

export type FolderConfig = z.infer<typeof FolderConfigSchema>;

export const ConnectorTypeSchema = z.enum([
  "local",
  "google",
  "onedrive",
  "dropbox",
  "web",
  "gmail",
  "jira",
  "confluence",
  "notion",
  "outlook",
  "hubspot",
  "zendesk",
  "slack",
  "airtable",
  "github",
  "ext_web",
]);

export type ConnectorType = z.infer<typeof ConnectorTypeSchema>;

const BaseConnectorRequestSchema = z.object({
  collection_id: z.string(),
});

export const LocalConnectorConfigSchema = z.object({
  type: z.literal("local"),
  os: z.string(),
  mac_address: z.string(),
  device_name: z.string(),
  folders: z.array(FolderConfigSchema),
});

export type LocalConnectorConfig = z.infer<typeof LocalConnectorConfigSchema>;

export const CreateConnectorRequestSchema = BaseConnectorRequestSchema.and(
  z.discriminatedUnion("type", [
    LocalConnectorConfigSchema,
    // Add other connector types here as needed
  ]),
);

export type CreateConnectorRequest = z.infer<
  typeof CreateConnectorRequestSchema
>;

export const ConnectorSchema = z.object({
  id: z.string(),
  type: ConnectorTypeSchema,
  os: z.string().optional(),
  mac_address: z.string().optional(),
  device_name: z.string().optional(),
  collection_id: z.string(),
  folders: z.array(FolderConfigSchema).optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Connector = z.infer<typeof ConnectorSchema>;

export const CreateConnectorResponseSchema = z.object({
  result: ConnectorSchema,
});

export type CreateConnectorResponse = z.infer<
  typeof CreateConnectorResponseSchema
>;
