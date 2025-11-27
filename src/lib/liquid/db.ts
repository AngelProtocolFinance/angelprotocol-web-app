import {
  PutCommand,
  QueryCommand,
  type QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { Db, type TxType, UpdateBuilder } from "@better-giving/db";
import type { AttrNames } from "@better-giving/types/utils";
import type {
  IBalLog,
  IBalLogsOptions,
  IInterestLogDb,
  IPage,
  IPageOptions,
  TAllocStatus,
} from "./interfaces";
import type { IInterestLog } from "./schemas";

export class LiquidDb extends Db {
  static readonly table = "liquid";
  static readonly gsi1 = "gsi1";

  key_bal_log(date: string) {
    return {
      PK: `BL#${this.env}`,
      SK: date,
    };
  }
  key_intr_log(id: string) {
    return { PK: `IL#${id}`, SK: `IL#${id}` } as const;
  }

  gsi1_intr_logs(date: string) {
    return { gsi1PK: `ILS#${this.env}`, gsi1SK: date } as const;
  }

  bal_log_record(data: IBalLog) {
    return {
      ...this.key_bal_log(data.date),
      ...data,
    };
  }

  bal_log_put(data: IBalLog) {
    const cmd = new PutCommand({
      TableName: LiquidDb.table,
      Item: this.bal_log_record(data),
    });
    return this.client.send(cmd);
  }

  bal_logs_qinput(opts?: IBalLogsOptions): QueryCommandInput {
    /** key condition expression */
    let kce = "PK = :pk";
    /** expression attribute values */
    const eav: Record<string, any> = {
      ":pk": this.key_bal_log("not used").PK,
    };

    // Add date range filtering if provided
    if (opts?.date_start && opts?.date_end) {
      kce += " AND SK BETWEEN :date_start AND :date_end";
      eav[":date_start"] = opts.date_start;
      eav[":date_end"] = opts.date_end;
    } else if (opts?.date_start) {
      kce += " AND SK >= :date_start";
      eav[":date_start"] = opts.date_start;
    } else if (opts?.date_end) {
      kce += " AND SK <= :date_end";
      eav[":date_end"] = opts.date_end;
    }

    const input: QueryCommandInput = {
      TableName: LiquidDb.table,
      KeyConditionExpression: kce,
      ExpressionAttributeValues: eav,
      Limit: opts?.limit ?? 10,
      ExclusiveStartKey: this.key_to_obj(opts?.next),
      ScanIndexForward: false,
      ConsistentRead: opts?.consistent,
    };
    return input;
  }

  async bal_logs(opts?: IBalLogsOptions): Promise<IPage<IBalLog>> {
    const cmd = new QueryCommand(this.bal_logs_qinput(opts));
    return this.client.send(cmd).then(this.to_page<IBalLog>);
  }
  async bal_ltd(): Promise<IBalLog> {
    const page1 = await this.bal_logs({ limit: 1, consistent: true });
    return page1.items[0];
  }

  intr_log_record(data: IInterestLogDb) {
    return {
      ...this.key_intr_log(data.id),
      ...this.gsi1_intr_logs(data.date_created),
      ...data,
    };
  }

  async intr_log_put(data: IInterestLogDb) {
    const cmd = new PutCommand({
      TableName: LiquidDb.table,
      Item: this.intr_log_record(data),
    });
    return this.client.send(cmd);
  }

  intr_log_mark_npo_completed_txi(
    intr_id: string,
    npo: string
  ): TxType["Update"] {
    const b = new UpdateBuilder();
    b.set(
      `${"alloc_status" satisfies keyof IInterestLogDb}.${npo}`,
      "completed" satisfies TAllocStatus
    );
    return {
      TableName: LiquidDb.table,
      Key: this.key_intr_log(intr_id),
      ...b.collect(),
    };
  }

  intr_logs_qinput(opts?: IPageOptions): QueryCommandInput {
    const names: AttrNames<IInterestLog> = {
      "#date_created": "date_created",
      "#total": "total",
      "#date_start": "date_start",
      "#date_end": "date_end",
    };
    const input: QueryCommandInput = {
      TableName: LiquidDb.table,
      IndexName: LiquidDb.gsi1,
      KeyConditionExpression: "gsi1PK = :pk",
      ExpressionAttributeValues: {
        ":pk": this.gsi1_intr_logs("not used").gsi1PK,
      },
      Limit: opts?.limit ?? 10,
      ExclusiveStartKey: this.key_to_obj(opts?.next),
      ScanIndexForward: false,
      ConsistentRead: opts?.consistent,
      ProjectionExpression: Object.keys(names).join(", "),
      ExpressionAttributeNames: names,
    };
    return input;
  }

  async intr_logs(opts?: IPageOptions): Promise<IPage<IInterestLog>> {
    const cmd = new QueryCommand(this.intr_logs_qinput(opts));
    return this.client.send(cmd).then(this.to_page<IInterestLog>);
  }
}
