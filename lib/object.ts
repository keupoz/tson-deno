import { JsonElement, parseRaw } from "./index.ts";

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

  public *[Symbol.iterator](): IterableIterator<
    [string, JsonElement<unknown>]
  > {
    for (const [key, value] of this.entries()) {
      yield [key, parseRaw(`${this.path}[${key}]`, value)];
    }
  }
}
