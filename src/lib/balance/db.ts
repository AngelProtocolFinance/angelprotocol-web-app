import {
  BatchGetCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { Db, type TxType } from "@better-giving/db";
import { projection } from "@better-giving/db/helpers";
import type { Ensure } from "@better-giving/types/utils";
import { fields_default } from "./constants";
import type {
  BalanceUpdateType,
  IBalance,
  IBalanceKey,
  IBalanceUpdate,
  IPrettyBalance,
  TBalKeys,
  TBalProjectedTo,
} from "./interfaces.js";

export class BalanceDb extends Db {
  static readonly table = "balances";

  key_balance(id: number): IBalanceKey {
    return { id, network: this.env };
  }
  balance_record(id: number) {
    return {
      ...this.key_balance(id),
      contributionsCount: 0,
      totalContributions: 0,
      payoutsPending: 0,
    } satisfies IBalance;
  }

  balance_put_txi(id: number): TxType["Put"] {
    const item = this.balance_record(id);
    return {
      TableName: BalanceDb.table,
      Item: item,
    };
  }

  async balance_put(id: number): Promise<IBalance> {
    const item = this.balance_record(id);
    const cmd = new PutCommand({
      TableName: BalanceDb.table,
      Item: item,
    });
    return this.client.send(cmd).then((x) => (x.Attributes ?? {}) as any);
  }

  balance_update_txi(id: number, updates: IBalanceUpdate): TxType["Update"] {
    const comps = Object.entries(updates).map(([k, [type, v]]) => {
      const upd8_by_type: { [K in BalanceUpdateType]: string } = {
        inc: `#${k} = if_not_exists(#${k}, :zero) + :${k}`,
        /** @dev must be made sure somewhere not to deduct some undefined or zero */
        dec: `#${k} = if_not_exists(#${k}, :zero) - :${k}`,
        set: `#${k} = :${k}`,
      };
      return {
        update: upd8_by_type[type],
        name: [`#${k}`, k],
        value: [`:${k}`, v as any],
        type,
      };
    });

    const needs_zero = comps.some(
      ({ type }) => type === "inc" || type === "dec"
    );
    const base_values = needs_zero ? { ":zero": 0 } : {};

    return {
      TableName: BalanceDb.table,
      Key: this.key_balance(id),
      UpdateExpression: `SET ${comps.map(({ update: u }) => u).join(",")}`,
      ExpressionAttributeNames: comps.reduce(
        (p, { name: [n, _n] }) => ({ ...p, [n]: _n }),
        {}
      ),
      ExpressionAttributeValues: comps.reduce(
        (p, { value: [v, _v] }) => ({
          ...p,
          [v]: _v,
        }),
        base_values
      ),
    };
  }

  async npo_balance(id: number): Promise<IPrettyBalance> {
    const cmd = new GetCommand({
      TableName: BalanceDb.table,
      Key: this.key_balance(id),
    });
    const res = await this.client.send(cmd);
    const item = res.Item as IBalance | undefined;
    return {
      liq: item?.liq ?? 0,
      cash: item?.cash ?? 0,
      lock_units: item?.lock_units ?? 0,
      ltd: item?.totalContributions ?? 0,
    };
  }

  async balances_get<T extends TBalKeys>(
    ids: number[],
    fields: T[] = Object.keys(fields_default) as T[]
  ): Promise<TBalProjectedTo<T>[]> {
    if (ids.length === 0) return [];
    const { names, expression } = projection(fields);
    const cmd = new BatchGetCommand({
      RequestItems: {
        [BalanceDb.table]: {
          Keys: ids.map((id) => this.key_balance(id)),
          ProjectionExpression: expression,
          ExpressionAttributeNames: names,
        },
      },
    });
    const { Responses } = await this.client.send(cmd);
    return (Responses?.[BalanceDb.table] ?? []) as any;
  }

  async movements() {
    const cmd = new QueryCommand({
      TableName: BalanceDb.table,
      IndexName: "movement-index",
      KeyConditionExpression: "#pk = :pk",
      ExpressionAttributeValues: { ":pk": this.env },
      ExpressionAttributeNames: { "#pk": "movement" },
    });
    const res = await this.client.send(cmd);
    return (res.Items || []) as Ensure<
      IBalance,
      "movement" | "movementDetails"
    >[];
  }
}
