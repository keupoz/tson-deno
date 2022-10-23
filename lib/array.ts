import { assert } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import { JsonElement, parseRaw } from "./index.ts";

export class JsonArray extends JsonElement<unknown[]> {
  public includes(value: unknown): boolean {
    return this.raw.includes(value);
  }

  public size(): number {
    return this.raw.length;
  }

  public isEmpty(): boolean {
    return this.raw.length === 0;
  }

  public get(index: number): JsonElement<unknown> {
    const value = this.raw[index];

    if (value === undefined) {
      throw new Error(`No element at index ${index} of member '${this.path}'`);
    }

    return parseRaw(`${this.path}[${index}]`, value);
  }

  public asBoolean(): boolean {
    assert(this.raw.length === 1, "Operation not supported");

    return this.get(0).asBoolean();
  }

  public asNumber(): number {
    assert(this.raw.length === 1, "Operation not supported");

    return this.get(0).asNumber();
  }

  public asString(): string {
    assert(this.raw.length === 1, "Operation not supported");

    return this.get(0).asString();
  }

  public *[Symbol.iterator](): IterableIterator<JsonElement<unknown>> {
    let i = 0;

    for (const value of this.raw) {
      yield parseRaw(`${this.path}[${i++}]`, value);
    }
  }
}
