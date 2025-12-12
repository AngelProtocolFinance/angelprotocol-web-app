import {
  GetCommand,
  PutCommand,
  QueryCommand,
  type QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Db, type TxType, UpdateBuilder } from "@better-giving/db";
import type {
  IBalanceTx,
  IBalanceTxsPage,
  IBalanceTxsPageOptions,
  IPageOptions,
  TAccount,
  TStatus,
} from "./interfaces.js";

export class BalanceTxsDb extends Db {
  static readonly table = "bal-txs";
  key_tx(id: string) {
    return { PK: `Tx#${id}`, SK: `Tx#${id}` } as const;
  }

  pk_gsi1_txs(status: TStatus) {
    return `Txs#${this.env}#${status}` as const;
  }

  key_gsi1_txs(date: string, status: TStatus) {
    return {
      gsi1PK: this.pk_gsi1_txs(status),
      gsi1SK: date,
    } as const;
  }
  key_gsi2_owner_txs(owner: string, date: string, account: TAccount) {
    return {
      gsi2PK: `OwnerTxs#${owner}#${this.env}#${account}`,
      gsi2SK: date,
    } as const;
  }

  /** for db transactions */
  tx_record(data: IBalanceTx) {
    return {
      ...this.key_tx(data.id),
      ...this.key_gsi1_txs(data.date_created, data.status),
      ...this.key_gsi2_owner_txs(data.owner, data.date_created, data.account),
      ...data,
    };
  }
  tx_put_txi(data: IBalanceTx): TxType["Put"] {
    return {
      TableName: BalanceTxsDb.table,
      Item: this.tx_record(data),
    };
  }
  /** dashboard withdraw/transfer */
  async tx_put(data: IBalanceTx) {
    const cmd = new PutCommand({
      TableName: BalanceTxsDb.table,
      Item: this.tx_record(data),
    });
    return this.client.send(cmd).then(() => data);
  }

  /** npo dashboard */
  async owner_txs(
    owner_id: string,
    account: TAccount,
    opts?: IPageOptions
  ): Promise<IBalanceTxsPage> {
    const cmd = new QueryCommand({
      TableName: BalanceTxsDb.table,
      IndexName: "gsi2",
      Limit: opts?.limit,
      KeyConditionExpression: "gsi2PK = :gsi2PK",
      ExclusiveStartKey: this.key_to_obj(opts?.next),
      ExpressionAttributeValues: {
        ":gsi2PK": this.key_gsi2_owner_txs(owner_id, "sk-not-used", account)
          .gsi2PK,
      },
      ScanIndexForward: false,
    });
    return this.client.send(cmd).then(this.to_page<IBalanceTx>);
  }

  async tx(id: string) {
    const cmd = new GetCommand({
      TableName: BalanceTxsDb.table,
      Key: this.key_tx(id),
      ConsistentRead: true,
    });
    const res = await this.client.send(cmd);
    return res.Item ? (this.sans_keys(res.Item) as IBalanceTx) : undefined;
  }

  async tx_update_status_txi(
    tx: IBalanceTx,
    status: TStatus
  ): Promise<TxType["Update"]> {
    const x = new UpdateBuilder();
    x.set("status", status);
    x.set("gsi1PK", this.pk_gsi1_txs(status));
    return {
      TableName: BalanceTxsDb.table,
      Key: this.key_tx(tx.id),
      ...x.collect(),
    };
  }

  /** finance dashboard */
  async txs(opts?: IBalanceTxsPageOptions): Promise<IBalanceTxsPage> {
    const input: QueryCommandInput = {
      TableName: BalanceTxsDb.table,
      IndexName: "gsi1",
      Limit: opts?.limit,
      KeyConditionExpression: "gsi1PK = :gsi1PK",
      ExclusiveStartKey: this.key_to_obj(opts?.next),
      ExpressionAttributeValues: {
        ":gsi1PK": this.pk_gsi1_txs(opts?.status ?? "pending"),
      },
      ScanIndexForward: false,
    };
    if (opts?.source_acc) {
      input.FilterExpression = "#account = :account";
      input.ExpressionAttributeValues![":account"] = opts.source_acc;
      input.ExpressionAttributeNames = { "#account": "account" };
    }

    const cmd = new QueryCommand(input);
    return this.client.send(cmd).then(this.to_page<IBalanceTx>);
  }
}

export interface IBalanceTxDb
  extends IBalanceTx,
    ReturnType<BalanceTxsDb["key_tx"]>,
    ReturnType<BalanceTxsDb["key_gsi1_txs"]>,
    ReturnType<BalanceTxsDb["key_gsi2_owner_txs"]> {}
