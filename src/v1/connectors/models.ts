import { z } from "zod";

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

export const ConnectorSchema = z.object({
  type: z.string(),
  status: z.string(),
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  cron_job: z.string(),
  timezone: z.string(),
  error: z.string().nullish(),
});

export type Connector = z.infer<typeof ConnectorSchema>;

export const ListConnectorsResponseSchema = z.object({
  result: z.array(ConnectorSchema),
});

export type ListConnectorsResponse = z.infer<
  typeof ListConnectorsResponseSchema
>;
