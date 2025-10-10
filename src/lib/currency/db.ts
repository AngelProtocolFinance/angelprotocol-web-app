import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { Db, type TxType } from "@better-giving/db";
import type { ICurrency } from "./interfaces";

export class CurrencyDb extends Db {
  static readonly table_name = "currencies";

  /** @param code uppercase 3-letter */
  key(code: string) {
    return { pk: `C#${code}`, sk: `C#${code}` };
  }
  get key_meta() {
    return { PK: "Meta", SK: "Meta" };
  }

  /** @param code uppercase 3-letter */
  async currency(code: string) {
    const cmd = new GetCommand({
      TableName: CurrencyDb.table_name,
      Key: this.key(code),
    });
    return this.client.send(cmd).then(this.sans_keys);
  }

  currency_put_txi(data: ICurrency): TxType["Put"] {
    return {
      TableName: CurrencyDb.table_name,
      Item: {
        ...this.key(data.code),
        ...data,
      },
    };
  }
  meta_put_txi(last_updated: string): TxType["Put"] {
    return {
      TableName: CurrencyDb.table_name,
      Item: {
        ...this.key_meta,
        last_updated,
      },
    };
  }
}
