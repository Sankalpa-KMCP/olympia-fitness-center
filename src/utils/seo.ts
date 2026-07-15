import type {
  ExternalDestination,
  HttpsUrl,
} from "../types/external-destination";
import type { IndexingState, StructuredData } from "../types/seo";
import { getEnabledExternalUrl } from "./external-destinations";

export function getRobotsContent(
  indexing: IndexingState,
): "noindex, nofollow" | undefined {
  return indexing === "noindex" ? "noindex, nofollow" : undefined;
}

export function createCanonicalHref(
  destination: ExternalDestination,
  pathname?: string,
): HttpsUrl | undefined {
  const origin = getEnabledExternalUrl(destination);

  if (!origin || !pathname?.startsWith("/")) {
    return undefined;
  }

  return new URL(pathname, origin).href as HttpsUrl;
}

function isStructuredData(input: unknown): input is StructuredData {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return false;
  }

  const candidate = input as Record<string, unknown>;

  return (
    candidate["@context"] === "https://schema.org" &&
    typeof candidate["@type"] === "string" &&
    candidate["@type"].trim().length > 0
  );
}

export function serializeStructuredData(input: unknown): string | undefined {
  if (!isStructuredData(input)) {
    return undefined;
  }

  return JSON.stringify(input).replaceAll("<", "\\u003c");
}
