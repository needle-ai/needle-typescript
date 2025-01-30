import { env } from "process";
import { NeedleCollectionsClient } from "./collections/client";
import { NeedleFilesClient } from "./files/client";
import { NeedleConnectorsClient } from "./connectors/client";
import { NEEDLE_SEARCH_URL } from "./constants";
import { NEEDLE_URL } from "./constants";
import { type NeedleOptions } from "./models";

export class Needle {
  private readonly needleUrl: string;
  private readonly needleSearchUrl: string;
  private readonly headers: Record<string, string>;

  readonly collections: NeedleCollectionsClient;
  readonly files: NeedleFilesClient;
  readonly connectors: NeedleConnectorsClient;

  constructor(opts?: NeedleOptions) {
    this.needleUrl = opts?.needleUrl ?? NEEDLE_URL;
    this.needleSearchUrl = opts?.needleSearchUrl ?? NEEDLE_SEARCH_URL;
    this.headers = {
      "Content-Type": "application/json",
      "x-api-key": opts?.apiKey ?? env.NEEDLE_API_KEY ?? "",
    };

    this.collections = new NeedleCollectionsClient({
      needleUrl: this.needleUrl,
      needleSearchUrl: this.needleSearchUrl,
      apiKey: this.headers["x-api-key"],
    });

    this.files = new NeedleFilesClient({
      needleUrl: this.needleUrl,
      apiKey: this.headers["x-api-key"],
    });

    this.connectors = new NeedleConnectorsClient({
      needleUrl: this.needleUrl,
      apiKey: this.headers["x-api-key"],
    });
  }
}
