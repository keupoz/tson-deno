import { JsonElement } from "./index.ts";

export type RawPrimitive = boolean | number | string;

export function isPrimitive(raw: unknown): raw is RawPrimitive {
  return (
    typeof raw === "string" ||
    typeof raw === "number" ||
    typeof raw === "boolean"
  );
}

export class JsonPrimitive extends JsonElement<RawPrimitive> {
  public isBoolean(): boolean {
    return typeof this.raw === "boolean";
  }

  public isNumber(): boolean {
    return typeof this.raw === "number";
  }

  public isString(): boolean {
    return typeof this.raw === "string";
  }

  public asBoolean(): boolean {
    switch (typeof this.raw) {
      case "boolean":
        return this.raw;

      case "string":
        return this.raw.toLowerCase() === "true";

      default:
        throw new Error(`Member '${this.path}' is not a boolean: ${this.raw}`);
    }
  }

  public asNumber(): number {
    switch (typeof this.raw) {
      case "number":
        return this.raw;

      case "string":
        return parseFloat(this.raw);

      default:
        throw new Error(`Member '${this.path}' is not a number: ${this.raw}`);
    }
  }

  public asString(): string {
    return typeof this.raw === "string" ? this.raw : String(this.raw);
  }
}
