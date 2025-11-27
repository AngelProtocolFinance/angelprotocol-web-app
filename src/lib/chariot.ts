/**
 * Amounts are in cents
 * @link https://docs.givechariot.com/api/grants/get
 */
export interface Grant {
  id: string;
  amount: number;
  feeDetail?: { total?: number };
  status?: "Initiated" | "Completed" | "Canceled";
}

interface Config {
  api_key: string;
  api_url: string;
}

export class Chariot {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  private async to_json<T = unknown>(res: Response) {
    if (!res.ok) throw await res.text();
    return res.json() as T;
  }

  async getGrant(id: string): Promise<Grant> {
    const res = await fetch(`${this.config.api_url}/v1/grants/${id}`, {
      headers: { authorization: `Bearer ${this.config.api_key}` },
    });
    return this.to_json(res);
  }

  async create_grant(
    workflow_session_id: string,
    amount_cents: number
  ): Promise<Grant> {
    const payload = {
      workflowSessionId: workflow_session_id,
      amount: amount_cents,
    };
    const res = await fetch(`${this.config.api_url}/v1/grants`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return this.to_json<Grant>(res);
  }
}
