import { formatDistanceToNow } from "date-fns";
import type { ActionFunction } from "react-router";
import { aws_monitor } from ".server/sdks";
import { is_resp, qstash_body } from ".server/utils";

/**
 * QStash failure callback payload
 */
interface IPayload {
  /** HTTP response status code
   * @example 200
   */
  status: number;
  /** Response header
   * @example { "content-type": ["application/json"] }
   */
  header: Record<string, string[]>;
  /** Base64 encoded response body
   * @example "YmFzZTY0IGVuY29kZWQgcm9keQ=="
   */
  body: string;
  /** How many times we retried to deliver the original message
   * @example 2
   */
  retried: number;
  /** Number of retries before the message assumed to be failed to delivered
   * @example 3
   */
  maxRetries: number;
  /** The ID of the message that triggered the callback
   * @example "msg_xxx"
   */
  sourceMessageId: string;
  /** The name of the URL Group (topic) if the request was part of a URL Group
   * @example "myTopic"
   */
  topicName?: string;
  /** The endpoint name if the endpoint is given a name within a topic
   * @example "myEndpoint"
   */
  endpointName?: string;
  /** The destination url of the message that triggered the callback
   * @example "http://myurl.com"
   */
  url: string;
  /** The http method of the message that triggered the callback
   * @example "GET"
   */
  method: string;
  /** The http header of the message that triggered the callback
   * @example { "authorization": "Bearer token" }
   */
  sourceHeader: Record<string, string>;
  /** The base64 encoded body of the message that triggered the callback
   * @example "YmFzZTY0kZWQgcm9keQ=="
   */
  sourceBody: string;
  /** The unix timestamp of the message that triggered the callback is/will be delivered in milliseconds
   * @example "1701198458025"
   */
  notBefore: string;
  /** The unix timestamp of the message that triggered the callback is created in milliseconds
   * @example "1701198447054"
   */
  createdAt: string;
  /** The scheduleId of the message if the message is triggered by a schedule
   * @example "scd_xxx"
   */
  scheduleId?: string;
  /** The IP address where the message that triggered the callback is published from
   * @example "178.247.74.179"
   */
  callerIP: string;
}

export const action: ActionFunction = async ({ request }) => {
  const b = await qstash_body(request);
  if (is_resp(b)) return b;

  const p: IPayload = JSON.parse(b);

  // decode base64 bodies
  const decode_body = (encoded: string): string => {
    try {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      // try to parse as json for better formatting
      try {
        const parsed = JSON.parse(decoded);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return decoded;
      }
    } catch {
      return encoded;
    }
  };

  const response_body = decode_body(p.body);
  const source_body = decode_body(p.sourceBody);

  // format timestamp with date-fns
  const created_date = new Date(Number(p.createdAt));
  const time_ago = formatDistanceToNow(created_date, { addSuffix: true });

  await aws_monitor.sendAlert({
    title: `🚨 QStash Delivery Failed - ${p.method} ${p.status}`,
    from: "Failure Callback",
    fields: [
      {
        name: "📍 Endpoint",
        value: p.url,
      },
      {
        name: "🔄 Retries",
        value: `${p.retried} / ${p.maxRetries} attempts`,
      },
      {
        name: "📬 Message ID",
        value: p.sourceMessageId,
      },
      {
        name: "⏰ Created",
        value: `${created_date.toISOString()} (${time_ago})`,
      },
      ...(p.topicName ? [{ name: "📢 Topic", value: p.topicName }] : []),
      ...(p.endpointName
        ? [{ name: "🎯 Endpoint Name", value: p.endpointName }]
        : []),
      {
        name: "📤 Original Request Body",
        value:
          source_body.length > 1000
            ? `${source_body.slice(0, 1000)}...\n(truncated)`
            : source_body,
      },
      {
        name: "📥 Response Body",
        value:
          response_body.length > 1000
            ? `${response_body.slice(0, 1000)}...\n(truncated)`
            : response_body,
      },
    ],
  });
};
