export type IndexingState = "index" | "noindex";

export type JsonPrimitive = boolean | number | string | null;
export type JsonValue =
  JsonPrimitive | readonly JsonValue[] | { readonly [key: string]: JsonValue };

export interface StructuredData {
  readonly "@context": "https://schema.org";
  readonly "@type": string;
  readonly [key: string]: JsonValue;
}

export interface OpenGraphMetadata {
  readonly title: string;
  readonly description: string;
  readonly type?: "website";
}
