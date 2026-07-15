import type {
  ExternalDestination,
  HttpsUrl,
  VerifiedExternalDestination,
} from "../types/external-destination";

function parseHttpsUrl(input: string): HttpsUrl | undefined {
  try {
    const url = new URL(input);

    if (
      url.protocol !== "https:" ||
      !url.hostname ||
      url.username ||
      url.password
    ) {
      return undefined;
    }

    return url.href as HttpsUrl;
  } catch {
    return undefined;
  }
}

export function createVerifiedExternalDestination(
  label: string,
  input: string,
): VerifiedExternalDestination {
  const normalizedLabel = label.trim();
  const url = parseHttpsUrl(input);

  if (!normalizedLabel || !url) {
    throw new TypeError("A label and valid HTTPS URL are required.");
  }

  return {
    label: normalizedLabel,
    state: "verified",
    url,
  };
}

export function getEnabledExternalUrl(
  destination: ExternalDestination,
): HttpsUrl | undefined {
  if (destination.state !== "verified") {
    return undefined;
  }

  return parseHttpsUrl(destination.url);
}
