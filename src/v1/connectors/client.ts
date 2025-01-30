import { ApiErrorSchema } from "../models";
import {
  type CreateConnectorRequest,
  CreateConnectorResponseSchema,
} from "./models";

export class NeedleConnectorsClient {
  private readonly needleUrl: string;
  private readonly headers: Record<string, string>;

  constructor({ needleUrl, apiKey }: { needleUrl: string; apiKey: string }) {
    this.needleUrl = needleUrl;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };
  }

  async create(request: CreateConnectorRequest) {
    const url = `${this.needleUrl}/api/v1/connectors/${request.type}`;
    const body = JSON.stringify(request);

    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return CreateConnectorResponseSchema.parse(await res.json()).result;
  }
}
