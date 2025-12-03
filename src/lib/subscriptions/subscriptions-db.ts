import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  type QueryCommandInput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { Db, UpdateBuilder } from "@better-giving/db";
import {
  type ISub,
  type ISubUpdate,
  type TStatus,
  to_flag,
} from "./interfaces";

type K = keyof ISub;
export class SubsDb extends Db {
  static readonly table = "subs";
  static readonly gsi1 = "gsi1";

  key(id: string) {
    return { PK: `Sub#${id}`, SK: `Sub#${id}` } as const;
  }
  gsi1_user_subs_pk(user_id: string) {
    return `UserSubs#${user_id}`;
  }
  gsi1_user_subs_sk(status: TStatus, date_created: string) {
    return `${to_flag(status)}#${date_created}` as const;
  }
  gsi1_user_subs_key(user_id: string, date_created: string, status: TStatus) {
    return {
      gsi1PK: this.gsi1_user_subs_pk(user_id),
      gsi1SK: this.gsi1_user_subs_sk(status, date_created),
    } as const;
  }

  record(data: ISub) {
    return {
      ...this.key(data.id),
      ...this.gsi1_user_subs_key(
        data.from_id,
        data.created_at.toString(),
        data.status
      ),
      ...data,
    };
  }

  async get(id: string): Promise<ISub | undefined> {
    const cmd = new GetCommand({
      TableName: SubsDb.table,
      Key: this.key(id),
    });
    return this.client.send(cmd).then(({ Item: i }) => i && this.sans_keys(i));
  }
  async user_subs(user_id: string, status?: TStatus): Promise<ISub[]> {
    const q: QueryCommandInput = {
      TableName: SubsDb.table,
      IndexName: SubsDb.gsi1,
      ScanIndexForward: false,
    };

    if (!status) {
      q.KeyConditionExpression = "#pk = :pk";
      q.ExpressionAttributeNames = {
        "#pk": "gsi1PK",
      };
      q.ExpressionAttributeValues = {
        ":pk": this.gsi1_user_subs_pk(user_id),
      };
    } else {
      q.KeyConditionExpression = "#pk = :pk AND begins_with(#sk, :sk)";
      q.ExpressionAttributeNames = {
        "#pk": "gsi1PK",
        "#sk": "gsi1SK",
      };
      q.ExpressionAttributeValues = {
        ":pk": this.gsi1_user_subs_pk(user_id),
        ":sk": to_flag(status),
      };
    }
    const cmd = new QueryCommand(q);
    return this.client
      .send(cmd)
      .then((r) => (r.Items || []).map((i) => this.sans_keys(i)));
  }

  async put(data: ISub) {
    const cmd = new PutCommand({
      TableName: SubsDb.table,
      Item: this.record(data),
      ConditionExpression: `attribute_not_exists(${"id" satisfies K})`,
    });
    return this.client.send(cmd);
  }

  async update(id: string, data: ISubUpdate): Promise<ISub> {
    const upd8 = new UpdateBuilder();
    for (const k in data) {
      upd8.set(k as K, (data as any)[k]);
    }

    if (data.status) {
      const prev = await this.get(id);
      if (prev) {
        upd8.set(
          "gsi1SK",
          this.gsi1_user_subs_sk(data.status, prev.created_at.toString())
        );
      }
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
