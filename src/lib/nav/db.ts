import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Db, type TxType } from "@better-giving/db";
import type {
  ILog,
  INpoSeriesOpts,
  IPage,
  IPageOptions,
  IRebalanceLog,
  ISeries,
  ISeriesPoint,
} from "./interfaces";

export class NavHistoryDB extends Db {
  static readonly table = "nav-history";
  gsi1_week_series_pk = `WeekSeries#${this.env}`;
  gsi1_week_series(date: string) {
    return {
      gsi1PK: this.gsi1_week_series_pk,
      gsi1SK: date,
    };
  }
  gsi2_day_series_pk = `DaySeries#${this.env}`;
  gsi2_day_series(date: string) {
    return {
      gsi2PK: this.gsi2_day_series_pk,
      gsi2SK: date,
    };
  }

  key_log_pk = `Log#${this.env}`;
  key_log(date: string) {
    return {
      PK: this.key_log_pk,
      SK: date,
    };
  }

  key_rebalance(id: string) {
    return {
      PK: `Rebalance#${id}`,
      SK: `Rebalance#${id}`,
    };
  }
  gsi1_rebalances_pk = `Rebalances#${this.env}`;
  gsi1_rebalances(date: string) {
    return {
      gsi1PK: this.gsi1_rebalances_pk,
      gsi1SK: date,
    };
  }

  async list(opts?: IPageOptions): Promise<IPage<ILog>> {
    const cmd = new QueryCommand({
      TableName: NavHistoryDB.table,
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: {
        ":pk": this.key_log_pk,
      },
      Limit: opts?.limit ?? 10,
      ExclusiveStartKey: this.key_to_obj(opts?.next),
      ScanIndexForward: false,
      ConsistentRead: opts?.consistent,
    });
    return this.client.send(cmd).then(this.to_page<ILog>);
  }

  async ltd(): Promise<ILog> {
    const page1 = await this.list({ limit: 1, consistent: true });
    return page1.items[0];
  }

  async week_series(opts?: IPageOptions): Promise<IPage<ILog>> {
    const cmd = new QueryCommand({
      TableName: NavHistoryDB.table,
      IndexName: "gsi1",
      KeyConditionExpression: "gsi1PK = :gsi1PK",
      ExpressionAttributeValues: {
        ":gsi1PK": this.gsi1_week_series_pk,
      },
      Limit: opts?.limit ?? 10,
      ExclusiveStartKey: this.key_to_obj(opts?.next),
      ScanIndexForward: false,
    });
    return this.client.send(cmd).then(this.to_page<ILog>);
  }

  async day_series(opts?: IPageOptions): Promise<IPage<ILog>> {
    const cmd = new QueryCommand({
      TableName: NavHistoryDB.table,
      IndexName: "gsi2",
      KeyConditionExpression: "gsi2PK = :gsi2PK",
      ExpressionAttributeValues: {
        ":gsi2PK": this.gsi2_day_series_pk,
      },
      Limit: opts?.limit ?? 10,
      ExclusiveStartKey: this.key_to_obj(opts?.next),
      ScanIndexForward: false,
    });
    return this.client.send(cmd).then(this.to_page<ILog>);
  }

  log_record(data: ILog, series?: ISeries) {
    return {
      ...data,
      ...this.key_log(data.date),
      // adds to gsi1
      ...(series?.week ? this.gsi1_week_series(data.date) : {}),
      // adds to gsi2
      ...(series?.day ? this.gsi2_day_series(data.date) : {}),
    };
  }

  log_put_txi(
    ...[data, series]: Parameters<typeof this.log_record>
  ): TxType["Put"] {
    return {
      TableName: NavHistoryDB.table,
      Item: this.log_record(data, series),
    };
  }
  async log_put(...[data, series]: Parameters<typeof this.log_record>) {
    const cmd = new PutCommand({
      TableName: NavHistoryDB.table,
      Item: this.log_record(data, series),
    });
    return this.client.send(cmd);
  }

  rebalance_record(data: IRebalanceLog) {
    return {
      ...data,
      ...this.key_rebalance(data.id),
      // adds to gsi1
      ...this.gsi1_rebalances(data.date),
    };
  }
  rebalance_put_txi(data: IRebalanceLog): TxType["Put"] {
    return {
      TableName: NavHistoryDB.table,
      Item: this.rebalance_record(data),
    };
  }

  rebalances(opts?: IPageOptions): Promise<IPage<IRebalanceLog>> {
    const cmd = new QueryCommand({
      TableName: NavHistoryDB.table,
      IndexName: "gsi1",
      KeyConditionExpression: "gsi1PK = :gsi1PK",
      ExpressionAttributeValues: {
        ":gsi1PK": this.gsi1_rebalances_pk,
      },
      Limit: opts?.limit ?? 10,
      ExclusiveStartKey: this.key_to_obj(opts?.next),
      ScanIndexForward: false,
    });
    return this.client.send(cmd).then(this.to_page<IRebalanceLog>);
  }

  async npo_series(id: number, opts?: INpoSeriesOpts): Promise<ISeriesPoint[]> {
    const { range: r = "quarter" } = opts ?? {};
    const limit = (($) => {
      switch ($) {
        case "week":
          return 7; //days
        case "month":
          return 30; //days
        case "quarter":
          return 13; //weeks
        case "year":
          return 52; //weeks
        default:
          return 30;
      }
    })(r);
    const series_fn =
      r === "week" || r === "month"
        ? this.day_series({ limit })
        : this.week_series({ limit });

    const { items = [] } = await series_fn;
    const points = items.toReversed().map((i) => {
      const units = i.holders[id] || 0;
      const price = i.price;
      return {
        date: i.date,
        price: price,
        units,
        value: units * price,
      };
    });

    return points;
  }
}
