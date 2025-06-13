import { type LoaderFunction, data } from "@vercel/remix";
import { type UserV2, isError } from "types/auth";
import { cognito, toAuth } from ".server/auth";
import type { Stored } from ".server/auth/session";
import { weld_data_fn } from ".server/registration/weld-data";

export interface LoaderData {
  doc_eid: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const q = new URL(request.url).searchParams;
  const weld_data_eid = q.get("weldDataEid");
  if (!weld_data_eid) throw new Response(null, { status: 400 });
  const { documentGroup } = await weld_data_fn(weld_data_eid);

  const refreshed_user = await commit_wform(user, session, documentGroup.eid);
  const x = { doc_eid: documentGroup.eid } satisfies LoaderData;
  return data(x, {
    headers: {
      ...(refreshed_user && {
        "Set-Cookie": refreshed_user.commit,
      }),
      "X-Remix-Revalidate": "1",
      "Cache-Control": "no-cache",
    },
  });
};

async function commit_wform(
  user: UserV2,
  sesssion: Stored,
  doc_eid_param: string | null
): Promise<(UserV2 & { commit: string }) | null> {
  if (!doc_eid_param) return null;

  const res = await cognito.updateUserAttributes(
    [{ Name: "custom:w_form", Value: doc_eid_param }],
    user.accessToken
  );
  if (isError(res)) {
    console.error("Error updating user attributes:", res.message);
    return null;
  }
  const commitment = await cognito.refresh(sesssion);
  if (isError(commitment)) {
    console.error("Error refreshing session:", commitment.message);
    return null;
  }

  return commitment;
}
