import { collectPaginatedApi } from "~/v1/helpers";
import { ApiErrorSchema, NonPaginated } from "../../models";
import { ListCollectionFilesRequest } from "../models";

import {
  type AddFilesToCollectionRequest,
  type DeleteCollectionFilesRequest,
  AddFilesToCollectionResponseSchema,
  ListCollectionFilesResponseSchema,
} from "./models";

export class NeedleCollectionFilesClient {
  private readonly needleUrl: string;
  private readonly headers: Record<string, string>;

  constructor({ needleUrl, apiKey }: { needleUrl: string; apiKey: string }) {
    this.needleUrl = needleUrl;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };
  }

  async list({ collection_id, offset, limit }: ListCollectionFilesRequest) {
    const queryParams = new URLSearchParams();
    if (offset !== undefined) queryParams.append("offset", offset.toString());
    if (limit !== undefined) queryParams.append("limit", limit.toString());

    const url = `${this.needleUrl}/api/v1/collections/${collection_id}/files?${queryParams.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return ListCollectionFilesResponseSchema.parse(await res.json()).result;
  }

  async listAll(params: NonPaginated<ListCollectionFilesRequest>) {
    const apiCall = this.list.bind(this);
    return collectPaginatedApi(apiCall, params);
  }

  async add({ collection_id, files }: AddFilesToCollectionRequest) {
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

  async delete({ collection_id, file_ids }: DeleteCollectionFilesRequest) {
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
