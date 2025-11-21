import { ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";
import { bappdb, npodb } from ".server/aws/db";
import { cognito_envs } from ".server/env";
import { cognito } from ".server/sdks";

interface Referrer {
  pay_id?: number;
  /** default $50 */
  pay_min: number;
  id: string;
  name: string;
  email: string;
}

const MIN_COMMISSION_DEFAULT = 50;

export async function get_referrer(
  referral_id: string
): Promise<Referrer | null> {
  //handle nonprofit referrer
  if (referral_id.startsWith("NPO-")) {
    const item = await npodb.npo_with_rid(referral_id);
    if (!item) return null;

    //get default payout method
    const wise_id = await bappdb.npo_default_bapp(item.id).then((x) => x?.id);
    if (!wise_id) return null;

    return {
      id: referral_id,
      name: item.name,
      email: "n/a",
      pay_id: +wise_id,
      pay_min: 50,
    };
  }

  const command = new ListUsersCommand({
    UserPoolId: cognito_envs.user_pool_id,
    Filter: `preferred_username = "${referral_id}"`,
    Limit: 1,
  });

  const res = await cognito.send(command);
  const [user] = res.Users || [];
  if (!user) return null;
  const { Attributes: attr_arr = [] } = user;
  const {
    "custom:pay_id": pay_id,
    "custom:pay_min": pay_min = MIN_COMMISSION_DEFAULT,
    email,
    family_name,
    given_name,
    preferred_username,
  } = attr_arr.reduce((acc, curr) => {
    acc[curr.Name || "unknown"] = curr.Value;
    return acc;
  }, {} as any);

  return {
    name: `${given_name} ${family_name}`,
    email,
    pay_id: +pay_id,
    pay_min: +pay_min,
    id: preferred_username,
  };
}
