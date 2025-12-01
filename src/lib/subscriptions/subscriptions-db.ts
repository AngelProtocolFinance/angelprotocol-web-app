import {
  DeleteCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { Db, UpdateBuilder } from "@better-giving/db";
import type { ISubs, ISubsUpdate } from "./interfaces";

type K = keyof ISubs;
export class SubsDb extends Db {
  static readonly table = "subs";

  key(id: string) {
    return { PK: `Sub#${id}`, SK: `Sub#${id}` } as const;
  }
  gsi1_user_subs_key(user_id: string, date_created: string) {
    return {
      gsi1PK: `User#${user_id}`,
      gsi1SK: date_created,
    };
  }

  async put(data: ISubs) {
    const cmd = new PutCommand({
      TableName: SubsDb.table,
      Item: data,
      ConditionExpression: `attribute_not_exists(${"id" satisfies K})`,
    });
    return this.client.send(cmd);
  }
  async update(id: string, data: ISubsUpdate): Promise<ISubs> {
    const upd8 = new UpdateBuilder();
    for (const k in data) {
      upd8.set(k as K, (data as any)[k]);
    }
    const cmd = new UpdateCommand({
      TableName: SubsDb.table,
      Key: this.key(id),
      ...upd8.collect(),
    });
    return this.client.send(cmd).then((r) => r.Attributes as any);
  }

  async del(id: string) {
    const cmd = new DeleteCommand({
      TableName: SubsDb.table,
      Key: this.key(id),
    });
    return this.client.send(cmd);
  }
}
