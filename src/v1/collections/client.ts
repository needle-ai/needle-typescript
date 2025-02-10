import { ApiErrorSchema } from "../models";
import { NeedleCollectionFilesClient } from "./files/client";
import {
  type SearchCollectionRequest,
  type CreateCollectionRequest,
  SearchCollectionResponseSchema,
  CreateCollectionResponseSchema,
  ListCollectionsResponseSchema,
  GetCollectionDetailsResponseSchema,
  GetCollectionStatsResponseSchema,
} from "./models";

export class NeedleCollectionsClient {
  private readonly needleUrl: string;
  private readonly needleSearchUrl: string;
  private readonly headers: Record<string, string>;
  readonly files: NeedleCollectionFilesClient;

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
    this.files = new NeedleCollectionFilesClient({
      needleUrl,
      apiKey,
    });
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

  async get({ collection_id }: { collection_id: string }) {
    const url = `${this.needleUrl}/api/v1/collections/${collection_id}`;

    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return GetCollectionDetailsResponseSchema.parse(await res.json()).result;
  }

  async getStats({ collection_id }: { collection_id: string }) {
    const url = `${this.needleUrl}/api/v1/collections/${collection_id}/stats`;

    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return GetCollectionStatsResponseSchema.parse(await res.json()).result;
  }

  async search({
    collection_id,
    text,
    max_distance,
    top_k,
  }: SearchCollectionRequest) {
    const url = `${this.needleSearchUrl}/api/v1/collections/${collection_id}/search`;
    const body = JSON.stringify({ text, max_distance, top_k });

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

  async create(params: CreateCollectionRequest) {
    const url = `${this.needleUrl}/api/v1/collections`;
    const body = JSON.stringify(params);

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
}
