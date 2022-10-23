import {
  isPrimitive,
  JsonArray,
  JsonElement,
  JsonNull,
  JsonObject,
  JsonPrimitive,
} from "./index.ts";

export function parseRaw(name: string, raw: unknown): JsonElement<unknown> {
  if (raw === null) return new JsonNull(name);

  if (isPrimitive(raw)) return new JsonPrimitive(name, raw);

  if (Array.isArray(raw)) return new JsonArray(name, raw);

  if (typeof raw === "object") {
    return new JsonObject(name, raw as Record<string, unknown>);
  }

  throw new Error(`'${name}' is not a JSON element: ${raw}`);
}

export function parse(text: string): JsonElement<unknown> {
  return parseRaw("", JSON.parse(text));
}
