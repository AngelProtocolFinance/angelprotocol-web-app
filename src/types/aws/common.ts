export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

export type EndowListPaginatedAWSQueryRes<T> = {
  Page: number;
  NumOfPages: number;
  Items: T;
};
export type PaginatedAWSQueryRes<T> = AWSQueryRes<T> & {
  ItemCutoff: number | null;
};

export type FileObject = {
  name: string;
  publicUrl: string;
};
