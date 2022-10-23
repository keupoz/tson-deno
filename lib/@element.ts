import { assert } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import { JsonArray, JsonNull, JsonObject, JsonPrimitive } from "./index.ts";

export abstract class JsonElement<T> {
  public readonly path: string;
  public readonly raw: T;

  constructor(path: string, raw: T) {
    this.path = path;
    this.raw = raw;
  }

  public isArray(): this is JsonArray {
    return this instanceof JsonArray;
  }

  public isObject(): this is JsonObject {
    return this instanceof JsonObject;
  }

  public isPrimitive(): this is JsonPrimitive {
    return this instanceof JsonPrimitive;
  }

  public isNull(): this is JsonNull {
    return this instanceof JsonNull;
  }

  public asArray(): JsonArray {
    assert(this.isArray(), `JSON member '${this.path}' is not an array`);

    return this;
  }

  public asObject(): JsonObject {
    assert(this.isObject(), `JSON member '${this.path}' is not an object`);

    return this;
  }

  public asPrimitive(): JsonPrimitive {
    assert(this.isPrimitive(), `JSON member '${this.path}' is not a primitive`);

    return this;
  }

  public asNull(): JsonNull {
    assert(this.isNull(), `JSON member '${this.path}' is not a null`);

    return this;
  }

  public asBoolean(): boolean {
    throw new Error("Unsupported operation");
  }

  public asNumber(): number {
    throw new Error("Unsupported operation");
  }

  public asInteger(): number {
    return Math.trunc(this.asNumber());
  }

  public asString(): string {
    throw new Error("Unsupported operation");
  }

  public toString(): string {
    return JSON.stringify(this.raw);
  }
}
