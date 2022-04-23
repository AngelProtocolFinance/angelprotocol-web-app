export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

export interface UpdateApplication {
  PK: string;
  poll_id: string;
  chain_id: string;
}
