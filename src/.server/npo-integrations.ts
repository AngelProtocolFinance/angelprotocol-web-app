import { Buffer } from "node:buffer";
import crypto from "node:crypto";
import { GetCommand, PutCommand, ap } from "./aws/db";
import { api_encryption_key, api_hmac_key, env } from "./env";

interface ApiKeyPayload {
  npoId: number;
  env: string;
  timestamp: number;
}

const encryptionKey = Buffer.from(api_encryption_key, "base64");
const hmacKey = Buffer.from(api_hmac_key, "base64");

export const generateZapierApiKey = async (npoId: number): Promise<string> => {
  // Create the payload
  const payload: ApiKeyPayload = { npoId, env, timestamp: Date.now() };

  // Encrypt the payload
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey, iv);
  const encryptedData = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // Combine IV, encrypted data, and auth tag
  const combined = Buffer.concat([iv, encryptedData, authTag]);

  // Create a signature using HMAC
  const signature = crypto
    .createHmac("sha256", hmacKey)
    .update(combined)
    .digest();

  const encodedData = combined.toString("base64url");
  const encodedSignature = signature.toString("base64url");
  const key = `${encodedData}_${encodedSignature}`;

  const cmd = new PutCommand({
    TableName: "api-keys",
    Item: {
      PK: `Zapier#${npoId}`,
      SK: env,
      apiKey: key,
      //duplicate
      ...payload,
    },
  });
  await ap.send(cmd);
  return key;
};

export const decodeApiKey = (apiKey: string): ApiKeyPayload => {
  const [encodedData, encodedSignature] = apiKey.split("_");

  const combined = Buffer.from(encodedData, "base64url");
  const signature = Buffer.from(encodedSignature, "base64url");

  // Verify signature
  const expectedSignature = crypto
    .createHmac("sha256", hmacKey)
    .update(combined)
    .digest();

  if (!crypto.timingSafeEqual(signature, expectedSignature)) {
    throw "Invalid signature";
  }

  // Extract IV, encrypted data, and auth tag
  const iv = combined.subarray(0, 16);
  const authTag = combined.subarray(combined.length - 16);
  const encryptedData = combined.subarray(16, combined.length - 16);

  // Decrypt the payload
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
