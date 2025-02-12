import { Buffer } from "node:buffer";
import crypto from "node:crypto";
import { GetCommand, PutCommand, ap } from "./aws/db";
import { api_encryption_key, env } from "./env";

interface ApiKeyPayload {
  npoId: number;
  env: string;
  timestamp: number;
}

const encryptionKey = Buffer.from(api_encryption_key, "base64");

export const generateZapierApiKey = async (npoId: number): Promise<string> => {
  const payload: ApiKeyPayload = { npoId, env, timestamp: Date.now() };

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey, iv);
  const encryptedData = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  const combined = Buffer.concat([iv, encryptedData, authTag]);
  const key = combined.toString("base64url");

  const cmd = new PutCommand({
    TableName: "api-keys",
    Item: {
      PK: `Zapier#${npoId}`,
      SK: env,
      apiKey: key,
      ...payload,
    },
  });
  await ap.send(cmd);
  return key;
};

export const decodeApiKey = (apiKey: string): ApiKeyPayload => {
  const combined = Buffer.from(apiKey, "base64url");

  const iv = combined.subarray(0, 12);
  const authTag = combined.subarray(combined.length - 16);
  const encryptedData = combined.subarray(12, combined.length - 16);

  const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encryptedData),
    decipher.final(),
  ]);

  return JSON.parse(decrypted.toString("utf8"));
};

export const getZapierApiKey = async (
  npoId: number
): Promise<string | undefined> => {
  const cmd = new GetCommand({
    TableName: "api-keys",
    Key: {
      PK: `Zapier#${npoId}`,
      SK: env,
    },
  });
  return ap.send(cmd).then((res) => res.Item?.apiKey);
};
