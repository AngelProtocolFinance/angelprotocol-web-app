import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Db } from "@better-giving/db";
import type { ICurrencyFvMap, TEquivalent } from "./interfaces";
import { dynamodb_table_name } from ".server/env";

/** general purpose table */
export class Table extends Db {
  static table_name = dynamodb_table_name;

  key_currency_map(to: TEquivalent) {
    return { PK: `CurrencyMap#${to}`, SK: `CurrencyMap#${to}` };
  }

  async currency_map(to: TEquivalent): Promise<ICurrencyFvMap> {
    const cmd = new GetCommand({
      TableName: Table.table_name,
      Key: this.key_currency_map(to),
    });
    return this.client.send(cmd).then(({ Item: i }) => this.sans_keys(i!));
  }

  async currency_map_put(data: ICurrencyFvMap, to: TEquivalent) {
    const cmd = new PutCommand({
      TableName: Table.table_name,
      Item: {
        ...this.key_currency_map(to),
        ...data,
      },
    });
    await this.client.send(cmd).then((res) => res.Attributes);
  }
}
