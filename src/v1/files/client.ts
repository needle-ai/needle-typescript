import { ApiErrorSchema } from "../models";
import {
  type GetUploadUrlRequest,
  GetUploadUrlResponseSchema,
  GetDownloadUrlResponseSchema,
} from "./models";

export class NeedleFilesClient {
  private readonly needleUrl: string;
  private readonly headers: Record<string, string>;

  constructor({ needleUrl, apiKey }: { needleUrl: string; apiKey: string }) {
    this.needleUrl = needleUrl;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };
  }

  async getUploadUrl({ content_type }: GetUploadUrlRequest) {
    const queryParams = new URLSearchParams();
    content_type.forEach((type) => queryParams.append("content_type", type));

    const url = `${this.needleUrl}/api/v1/files/upload_url?${queryParams.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return GetUploadUrlResponseSchema.parse(await res.json()).result;
  }

  async getDownloadUrl(fileId: string) {
    const url = `${this.needleUrl}/api/v1/files/${fileId}/download_url`;

    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return GetDownloadUrlResponseSchema.parse(await res.json()).result;
  }
}
