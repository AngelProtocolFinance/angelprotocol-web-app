export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}
