import { z } from "zod";
import { ConnectorFileSchema } from "../../files/models";

export const AddFilesToLocalConnectorResponseSchema = z.object({
  result: z.array(ConnectorFileSchema),
});

export type AddFilesToLocalConnectorResponse = z.infer<
  typeof AddFilesToLocalConnectorResponseSchema
>;

export const DeleteFilesFromLocalConnectorResponseSchema = z.object({
  result: z.array(ConnectorFileSchema),
});

export type DeleteFilesFromLocalConnectorResponse = z.infer<
  typeof DeleteFilesFromLocalConnectorResponseSchema
>;

export const DeleteLocalConnectorFilesRequestSchema = z.discriminatedUnion(
  "by",
  [
    z.object({
      connector_id: z.string(),
      by: z.literal("name"),
      name: z.string(),
    }),
    z.object({
      connector_id: z.string(),
      by: z.literal("file_ids"),
      file_ids: z.array(z.string()),
    }),
  ],
);

export type DeleteLocalConnectorFilesRequest = z.infer<
  typeof DeleteLocalConnectorFilesRequestSchema
>;
