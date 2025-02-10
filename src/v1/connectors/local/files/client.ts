import { ApiErrorSchema } from "~/v1/models";
import {
  AddFilesToLocalConnectorResponseSchema,
  DeleteFilesFromLocalConnectorResponseSchema,
  DeleteLocalConnectorFilesRequest,
} from "./models";

export class NeedleLocalConnectorFilesClient {
  private readonly needleUrl: string;
  private readonly headers: Record<string, string>;

  constructor({ needleUrl, apiKey }: { needleUrl: string; apiKey: string }) {
    this.needleUrl = needleUrl;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };
  }

  async add({
    connector_id,
    files,
  }: {
    connector_id: string;
    files: { name: string; url: string; updated_at: Date }[];
  }) {
    const url = `${this.needleUrl}/api/v1/connectors/${connector_id}/local/files`;
    const res = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ files }),
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return AddFilesToLocalConnectorResponseSchema.parse(await res.json())
      .result;
  }

  async delete({ connector_id, ...params }: DeleteLocalConnectorFilesRequest) {
    const url = `${this.needleUrl}/api/v1/connectors/${connector_id}/local/files`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify(params),
    });

    if (res.status >= 400) {
      throw ApiErrorSchema.parse(await res.json()).error;
    }

    return DeleteFilesFromLocalConnectorResponseSchema.parse(await res.json())
      .result;
  }
}
