import { ApiErrorSchema } from "~/v1/models";
import {
  CreateWebConnectorRequest,
  CreateWebConnectorResponseSchema,
} from "./models";

export class NeedleWebConnectorClient {
  private readonly needleUrl: string;
  private readonly headers: Record<string, string>;

  constructor({ needleUrl, apiKey }: { needleUrl: string; apiKey: string }) {
    this.needleUrl = needleUrl;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };
  }

  async create({ ...params }: CreateWebConnectorRequest) {
    const url = `${this.needleUrl}/api/v1/connectors/web`;
    const body = JSON.stringify(params);

    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return CreateWebConnectorResponseSchema.parse(await res.json()).result;
  }
}
