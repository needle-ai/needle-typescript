import { ApiErrorSchema } from "../models";
import {
  type SearchCollectionRequest,
  SearchCollectionResponseSchema,
  CreateCollectionRequest,
  CreateCollectionResponseSchema,
  type AddFilesToCollectionRequest,
  AddFilesToCollectionResponseSchema,
  ListCollectionsResponseSchema,
  GetCollectionDetailsResponseSchema,
  GetCollectionStatsResponseSchema,
  type ListCollectionFilesRequest,
  ListCollectionFilesResponseSchema,
  type DeleteCollectionFilesRequest,
  DeleteCollectionFilesRequestSchema,
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

  async list() {
    const url = `${this.needleUrl}/api/v1/collections`;

    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return ListCollectionsResponseSchema.parse(await res.json()).result;
  }

  async get(collectionId: string) {
    const url = `${this.needleUrl}/api/v1/collections/${collectionId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return GetCollectionDetailsResponseSchema.parse(await res.json()).result;
  }

  async getStats(collectionId: string) {
    const url = `${this.needleUrl}/api/v1/collections/${collectionId}/stats`;

    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return GetCollectionStatsResponseSchema.parse(await res.json()).result;
  }

  async listFiles({
    collection_id,
    offset,
    limit,
  }: ListCollectionFilesRequest) {
    let url = `${this.needleUrl}/api/v1/collections/${collection_id}/files`;
    const params: string[] = [];

    // Only include parameters if they're provided
    if (typeof offset === "number") {
      params.push(`offset=${offset}`);
    }
    if (typeof limit === "number") {
      params.push(`limit=${limit}`);
    }

    // Add query string if we have parameters
    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return ListCollectionFilesResponseSchema.parse(await res.json()).result;
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

  async create(request: CreateCollectionRequest) {
    const url = `${this.needleUrl}/api/v1/collections`;
    const body = JSON.stringify(request);

    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return CreateCollectionResponseSchema.parse(await res.json()).result;
  }

  async addFiles({ collection_id, files }: AddFilesToCollectionRequest) {
    const url = `${this.needleUrl}/api/v1/collections/${collection_id}/files`;
    const body = JSON.stringify({ files });

    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return AddFilesToCollectionResponseSchema.parse(await res.json()).result;
  }

  async deleteFiles({ collection_id, file_ids }: DeleteCollectionFilesRequest) {
    DeleteCollectionFilesRequestSchema.parse({ collection_id, file_ids });

    const url = `${this.needleUrl}/api/v1/collections/${collection_id}/files`;
    const body = JSON.stringify({ file_ids });

    const res = await fetch(url, {
      method: "DELETE",
      headers: this.headers,
      body,
    });

    if (res.status === 204) {
      return;
    }

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }
  }
}
