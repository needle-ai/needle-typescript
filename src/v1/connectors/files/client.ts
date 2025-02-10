import { collectPaginatedApi } from "~/v1/helpers";
import { ApiErrorSchema, NonPaginated } from "../../models";
import {
  ListConnectorFilesRequest,
  ListConnectorFilesResponseSchema,
} from "./models";

export class NeedleConnectorFilesClient {
  private readonly needleUrl: string;
  private readonly headers: Record<string, string>;

  constructor({ needleUrl, apiKey }: { needleUrl: string; apiKey: string }) {
    this.needleUrl = needleUrl;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };
  }

  async list({ connector_id, offset, limit }: ListConnectorFilesRequest) {
    const queryParams = new URLSearchParams();
    if (offset !== undefined) queryParams.append("offset", offset.toString());
    if (limit !== undefined) queryParams.append("limit", limit.toString());

    const url = `${this.needleUrl}/api/v1/connectors/${connector_id}/files?${queryParams.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return ListConnectorFilesResponseSchema.parse(await res.json()).result;
  }

  async listAll(params: NonPaginated<ListConnectorFilesRequest>) {
    const apiCall = this.list.bind(this);
    return collectPaginatedApi(apiCall, params);
  }
}
