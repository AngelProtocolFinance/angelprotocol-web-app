import { BatchGetCommand, apes, donordb } from "./aws/db";
import { env } from "./env";

export const npo_donors = async (
  recipient_id: string /** uuid or number id */,
  next?: string
) => {
  const { items: donors, next: n } = await donordb.list(recipient_id, {
    next,
    limit: 10,
  });

  if (donors.length === 0) {
    return { items: [], next: undefined };
  }

  //get user's metadata
  const tables_users_meta = "users-meta";
  const distinct_donor_ids = new Set<string>(donors.map((x) => x.donor_id));
  const batchGet = new BatchGetCommand({
    RequestItems: {
      [tables_users_meta]: {
        Keys: Array.from(distinct_donor_ids.values()).map((x) => {
          return {
            PK: `User#${x}`,
            SK: env,
          };
        }),
        ProjectionExpression: "email, photo",
      },
    },
  });
  const { Responses } = await apes.send(batchGet);

  const photoMap = (Responses?.[tables_users_meta] ?? []).reduce((acc, x) => {
    acc[x.email] = x.photo;
    return acc;
  }, {});

  const items = (donors || []).map(({ donor_id, env, ...x }) => ({
    ...x,
    photo: photoMap[donor_id],
  }));

  return {
    items,
    next: n,
  };
};
