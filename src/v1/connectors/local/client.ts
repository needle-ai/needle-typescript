import { ApiErrorSchema } from "~/v1/models";
import {
  type CreateLocalConnectorRequest,
  CreateLocalConnectorResponseSchema,
  DeleteLocalConnectorResponseSchema,
  GetLocalConnectorResponseSchema,
  ListLocalConnectorsResponseSchema,
} from "./models";
import { NeedleLocalConnectorFilesClient } from "./files/client";

export class NeedleLocalConnectorClient {
  private readonly needleUrl: string;
  private readonly headers: Record<string, string>;
  readonly files: NeedleLocalConnectorFilesClient;

  constructor({ needleUrl, apiKey }: { needleUrl: string; apiKey: string }) {
    this.needleUrl = needleUrl;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };

    // sub-clients
    this.files = new NeedleLocalConnectorFilesClient({
      needleUrl,
      apiKey,
    });
  }

  async list() {
    const url = `${this.needleUrl}/api/v1/connectors/local`;
    const res = await fetch(url, {
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return ListLocalConnectorsResponseSchema.parse(await res.json()).result;
  }

  async get({ connector_id }: { connector_id: string }) {
    const url = `${this.needleUrl}/api/v1/connectors/${connector_id}/local`;
    const res = await fetch(url, {
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return GetLocalConnectorResponseSchema.parse(await res.json()).result;
  }

  async create({ ...params }: CreateLocalConnectorRequest) {
    const url = `${this.needleUrl}/api/v1/connectors/local`;
    const body = JSON.stringify(params);

    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return CreateLocalConnectorResponseSchema.parse(await res.json()).result;
  }

  async delete({ connector_id }: { connector_id: string }) {
    const url = `${this.needleUrl}/api/v1/connectors/${connector_id}/local`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return DeleteLocalConnectorResponseSchema.parse(await res.json()).result;
  }
}
