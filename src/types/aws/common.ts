export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
  /**
   * base64string
   * only present when Items > 25
   */
  LastEvaluatedKey?: string;
}

export type FileObject = {
  name: string;
  publicUrl: string;
};
