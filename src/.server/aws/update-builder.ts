interface Comps {
  UpdateExpression: string;
  ExpressionAttributeNames?: Record<string, string>;
  ExpressionAttributeValues?: Record<string, any>;
}
export class UpdateBuilder {
  private sets: string[] = [];
  private removes: string[] = [];
  private names: Record<string, string> | undefined = undefined;
  private values: Record<string, any> | undefined = undefined;

  set(
    path: string,
    /** caller to decide if nested update or replace */
    value: any
  ): this {
    const parts = path.split(".");
    const placeholder = `:${parts.join("_")}`;
    const aliases = parts.map((part) => `#${part}`);

    this.sets.push(`${aliases.join(".")} = ${placeholder}`);
    for (let i = 0; i < parts.length; i++) {
      this.names ||= {};
      this.names[`#${parts[i]}`] = parts[i];
    }
    this.values ||= {};
    this.values[placeholder] = value;
    return this;
  }

  remove(attributePath: string): this {
    const parts = attributePath.split(".");
    const safeNames = parts.map((part) => `#${part}`);

    this.removes.push(safeNames.join("."));
    for (let i = 0; i < parts.length; i++) {
      this.names ||= {};
      this.names[`#${parts[i]}`] = parts[i];
    }
    return this;
  }

  collect(): Comps {
    const exp = [
      ["SET", this.sets.join(", ")],
      ["REMOVE", this.removes.join(", ")],
    ]
      .filter((x) => x[1])
      .map((x) => x.join(" "))
      .join(" ");

    return {
      UpdateExpression: exp,
      ExpressionAttributeNames: this.names,
      ExpressionAttributeValues: this.values,
    };
  }
}
