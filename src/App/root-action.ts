import { loadAuth, redirectToAuth } from "auth";
import { cognito } from "auth/cognito";
import { parseWithValibot } from "conform-to-valibot";
import { appRoutes } from "constants/routes";
import { APIs } from "constants/urls";
import { type ActionFunction, redirect } from "react-router-dom";
import { version as v } from "services/helpers";
import { emailSubs } from "types/hubspot-subscription";

export const rootAction: ActionFunction = async ({ request }) => {
  const r = request.clone();
  const form = await r.formData();
  const intent = form.get("intent");

  if (intent === "subscribe") {
    const payload = await request
      .formData()
      .then((f) => parseWithValibot(f, { schema: emailSubs }));

    if (payload.status !== "success") return payload.reply();

    const url = new URL(APIs.aws);
    url.pathname = `${v(1)}/hubspot/email-subs`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email: payload.value.email }),
    });

    if (!res.ok) return "error";
    return "success";
  }

  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  //authenticated requests

  if (intent === "logout") {
    await cognito.signOut(auth.accessToken);
    return redirect(appRoutes.marketplace);
  }

  if (intent === "toggle-bookmark") {
    const data = await request.formData();
    const action = data.get("action");
    const endowId = data.get("endowId");
    console.log(Object.fromEntries(data.entries()));

    const url = new URL(APIs.aws);
    url.pathname =
      action === "add"
        ? `${v(1)}/bookmarks`
        : `${v(1)}/bookmarks/${data.get("endowId")}`;
    const req = new Request(url, {
      method: action === "add" ? "POST" : "DELETE",
      body: action === "add" ? JSON.stringify({ endowId }) : null,
      headers: { authorization: auth.idToken },
    });

    const res = await fetch(req);
    if (!res.ok) throw res;

    await caches.open("bg").then((c) => {
      const key = new URL(APIs.aws);
      key.pathname = `${v(1)}/bookmarks`;
      c.delete(key, { ignoreSearch: true });
    });

    return res;
  }

  return { status: 400, body: "invalid intent" };
};

// toggleUserBookmark: builder.mutation<
//       unknown,
//       { endowId: number; action: "add" | "delete" }
//     >({
//       invalidatesTags: ["user-bookmarks"],
//       query: ({ endowId, action }) => {
//         if (action === "add") {
//           return {
//             url: `${v(1)}/bookmarks`,
//             method: "POST",
//             body: { endowId },
//             headers: { authorization: TEMP_JWT },
//           };
//         }

//         return {
//           url: `${v(1)}/bookmarks/${endowId}`,
//           method: "DELETE",
//           //get user id from jwt
//           headers: { authorization: TEMP_JWT },
//         };
//       },
//       async onQueryStarted({ endowId, action }, { dispatch, queryFulfilled }) {
//         const patchResult = dispatch(
//           aws.util.updateQueryData("userBookmarks", null, (draft) => {
//             if (action === "add") {
//               draft.push(endowId);
//             } else {
//               const idx = draft.indexOf(endowId);
//               if (idx !== -1) {
//                 draft.splice(idx, 1);
//               }
//             }
//           })
//         );
//         try {
//           await queryFulfilled;
//         } catch {
//           patchResult.undo();
//         }
//       },
//     }),
