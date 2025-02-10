import { ApiErrorSchema } from "../models";
import { NeedleConnectorFilesClient } from "./files/client";
import { NeedleLocalConnectorClient } from "./local/client";
import { ListConnectorsResponseSchema } from "./models";

export class NeedleConnectorsClient {
  private readonly needleUrl: string;
  private readonly headers: Record<string, string>;
  readonly files: NeedleConnectorFilesClient;
  readonly local: NeedleLocalConnectorClient;

  constructor({ needleUrl, apiKey }: { needleUrl: string; apiKey: string }) {
    this.needleUrl = needleUrl;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };

    // sub-clients
    this.files = new NeedleConnectorFilesClient({ needleUrl, apiKey });
    this.local = new NeedleLocalConnectorClient({ needleUrl, apiKey });
  }

  async list() {
    const url = `${this.needleUrl}/api/v1/connectors`;
    const res = await fetch(url, {
      headers: this.headers,
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return ListConnectorsResponseSchema.parse(await res.json()).result;
  }
}
