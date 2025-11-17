import crypto from "node:crypto";
import { crc32 } from "node:zlib";
import { resp } from "helpers/https";
import { paypal_envs } from ".server/env";

const cert_cache = new Map<string, string>();
async function download_and_cache_cert(cert_url: string): Promise<string> {
  if (cert_cache.has(cert_url)) return cert_cache.get(cert_url)!;
  const res = await fetch(cert_url);
  if (!res.ok) throw res;
  const cert = await res.text();
  cert_cache.set(cert_url, cert);
  return cert;
}

export async function verified_body(
  request: Request
): Promise<string | Response> {
  try {
    const {
      "paypal-transmission-id": transmission_id,
      "paypal-transmission-time": timestamp,
      "paypal-cert-url": cert_url,
      "paypal-transmission-sig": signature,
    } = Object.fromEntries(request.headers.entries());

    if (!transmission_id)
      return resp.status(201, "missing paypal-transmission-id");
    if (!timestamp) return resp.status(201, "missing paypal-transmission-time");
    if (!cert_url) return resp.status(201, "missing paypal-cert-url");
    if (!signature) return resp.status(201, "missing paypal-transmission-sig");

    const json_str = await request.text();

    const crc_body = crc32(json_str);
    const message = [
      transmission_id,
      timestamp,
      paypal_envs.webhook_id,
      crc_body,
    ].join("|");

    const cert = await download_and_cache_cert(cert_url);
    const verifier = crypto.createVerify("SHA256");
    verifier.update(message);

    const signature_buffer = Buffer.from(signature, "base64");
    const is_valid = verifier.verify(cert, signature_buffer);
    if (!is_valid) return resp.status(201, "invalid signature");

    return json_str;
  } catch (error) {
    return resp.status(201, "signature verification error");
  }
}
