import { type ActionFunction, redirect } from "react-router";
import { schema } from "./schema";
import { cognito, to_auth } from ".server/auth";
import { getValidatedFormData } from "remix-hook-form";
import type { Route } from "./+types";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { dondb } from ".server/aws/db";
import { resp } from "helpers/https";
import { EmailSQS } from "@better-giving/types/email-sqs";

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const don = await dondb.item(params.id);
  if (!don) return resp.status(404);

  //user can only access their own donation
  if (don.email?.toLowerCase() !== user.email.toLowerCase()) {
    return resp.status(403);
  }

  return user;
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const fv = await getValidatedFormData(request, valibotResolver(schema));
  if (fv.errors) return fv;

  const don = await dondb.item(params.id);
  if (!don) return resp.status(404);

  //user can only access their own donation
  if (don.email?.toLowerCase() !== user.email.toLowerCase()) {
    return resp.status(403);
  }

  //but can send receipt to other email
  const payload: EmailSQS.Donation.ReceiptData = {};

  return redirect("..");
};
