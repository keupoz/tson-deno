import { JsonElement } from "./index.ts";

export class JsonNull extends JsonElement<null> {
  constructor(path: string) {
    super(path, null);
  }
}
