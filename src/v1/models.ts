import { z } from "zod";

export const NeedleOptionsSchema = z.object({
  needleUrl: z.string().optional(),
  needleSearchUrl: z.string().optional(),
  apiKey: z.string().optional(),
});

export type NeedleOptions = z.infer<typeof NeedleOptionsSchema>;

export const ApiErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    data: z.unknown().optional(),
  }),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export type NonPaginated<RequestParams> = Omit<
  RequestParams,
  "offset" | "limit"
>;
