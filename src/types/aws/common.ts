export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
  /**
   * base64string
   * only present when Items > 25
   * pass this back as { headers:{ key: LastEvaluatedKey }} to get next page
   */
  LastEvaluatedKey?: string;
}
