export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

export type EndowListPaginatedAWSQueryRes<T> = AWSQueryRes<T> & {
  Page: number;
  NumOfPages: number;
};
export type PaginatedAWSQueryRes<T> = AWSQueryRes<T> & { ItemCutoff: number };

export type FileObject = {
  name: string;
  publicUrl: string;
};
