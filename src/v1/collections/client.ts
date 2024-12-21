import { ApiErrorSchema } from "../models";
import {
  type SearchCollectionRequest,
  SearchCollectionResponseSchema,
} from "./models";

export class NeedleCollectionsClient {
  private readonly needleUrl: string;
  private readonly needleSearchUrl: string;
  private readonly headers: Record<string, string>;

  constructor({
    needleUrl,
    needleSearchUrl,
    apiKey,
  }: {
    needleUrl: string;
    needleSearchUrl: string;
    apiKey: string;
  }) {
    this.needleUrl = needleUrl;
    this.needleSearchUrl = needleSearchUrl;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };
  }

  async search({ collection_id, ...request }: SearchCollectionRequest) {
    const url = `${this.needleSearchUrl}/api/v1/collections/${collection_id}/search`;
    const body = JSON.stringify(request);

    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return SearchCollectionResponseSchema.parse(await res.json()).result;
  }
}
