import {
  JsonArray,
  JsonElement,
  JsonNull,
  JsonPrimitive,
  parseRaw,
} from "./index.ts";

export class JsonObject extends JsonElement<Record<string, unknown>> {
  public keys(): string[] {
    return Object.keys(this.raw);
  }

  public entries(): [string, unknown][] {
    return Object.entries(this.raw);
  }

  public size(): number {
    return this.keys().length;
  }

  public has(key: string): boolean {
    return this.keys().includes(key);
  }

  public get(key: string): JsonElement<unknown> {
    const value = this.raw[key];

    if (value === undefined) {
      throw new Error(`No element with key '${key}' of member '${this.path}'`);
    }

    return parseRaw(`${this.path}[${key}]`, value);
  }

  public getArray(key: string): JsonArray {
    return this.get(key).asArray();
  }

  public getObject(key: string): JsonObject {
    return this.get(key).asObject();
  }

  public getPrimitve(key: string): JsonPrimitive {
    return this.get(key).asPrimitive();
  }

  public getNull(key: string): JsonNull {
    return this.get(key).asNull();
  }

  public *[Symbol.iterator](): IterableIterator<
    [string, JsonElement<unknown>]
  > {
    for (const [key, value] of this.entries()) {
      yield [key, parseRaw(`${this.path}[${key}]`, value)];
    }
  }
}
