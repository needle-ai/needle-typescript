import { z } from "zod";

const LocalFolderSchema = z.object({
  folder_path: z.string(),
  recursive: z.boolean(),
});

export type LocalFolder = z.infer<typeof LocalFolderSchema>;

export const LocalConnectorSchema = z.object({
  id: z.string(),
  type: z.literal("local"),
  name: z.string(),
  synced_at: z.string().nullish(),
  os: z.string(),
  cpu: z.string(),
  device_name: z.string(),
  device_model: z.string(),
  serial_number: z.string(),
  collection_ids: z.array(z.string()),
  folders: z.array(LocalFolderSchema),
  created_at: z.string(),
});

export type LocalConnector = z.infer<typeof LocalConnectorSchema>;

export const CreateLocalConnectorRequestSchema = z.object({
  collection_ids: z.array(z.string()),
  name: z.string(),
  os: z.string(),
  cpu: z.string(),
  device_name: z.string(),
  device_model: z.string(),
  serial_number: z.string(),
  folders: z.array(LocalFolderSchema),
});

export type CreateLocalConnectorRequest = z.infer<
  typeof CreateLocalConnectorRequestSchema
>;

export const CreateLocalConnectorResponseSchema = z.object({
  result: LocalConnectorSchema,
});

export type CreateLocalConnectorResponse = z.infer<
  typeof CreateLocalConnectorResponseSchema
>;

export const DeleteLocalConnectorResponseSchema = z.object({
  result: LocalConnectorSchema,
});

export type DeleteLocalConnectorResponse = z.infer<
  typeof DeleteLocalConnectorResponseSchema
>;

export const GetLocalConnectorResponseSchema = z.object({
  result: LocalConnectorSchema,
});

export type GetLocalConnectorResponse = z.infer<
  typeof GetLocalConnectorResponseSchema
>;

export const ListLocalConnectorsResponseSchema = z.object({
  result: z.array(LocalConnectorSchema),
});

export type ListLocalConnectorsResponse = z.infer<
  typeof ListLocalConnectorsResponseSchema
>;
