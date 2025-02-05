import { z } from "zod";

export const ContentType = z.union([
  z.literal("application/vnd.google-apps.document"),
  z.literal("application/vnd.google-apps.presentation"),
  z.literal("application/vnd.google-apps.spreadsheet"),
  z.literal("application/pdf"),
  z.literal(
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ),
  z.literal(
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ),
  z.literal(
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ),
  z.literal("application/msword"),
  z.literal("application/vnd.ms-excel"),
  z.literal("application/vnd.ms-powerpoint"),
  z.literal("text/csv"),
  z.literal("text/html"),
  z.literal("text/calendar"),
  z.literal("text/plain"),
]);

export type ContentType = z.infer<typeof ContentType>;

export const GetUploadUrlRequestSchema = z.object({
  content_type: z.array(ContentType),
});

export type GetUploadUrlRequest = z.infer<typeof GetUploadUrlRequestSchema>;

export const UploadUrlResultSchema = z.object({
  url: z.string(),
  upload_url: z.string(),
});

export type UploadUrlResult = z.infer<typeof UploadUrlResultSchema>;

export const GetUploadUrlResponseSchema = z.object({
  result: z.array(UploadUrlResultSchema),
});

export type GetUploadUrlResponse = z.infer<typeof GetUploadUrlResponseSchema>;

export const GetDownloadUrlResponseSchema = z.object({
  result: z.string(),
});

export type GetDownloadUrlResponse = z.infer<
  typeof GetDownloadUrlResponseSchema
>;
