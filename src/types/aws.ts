interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

export type PaginatedAWSQueryRes<T> = AWSQueryRes<T> & {
  ItemCutoff: number | null;
};

export type FileObject = {
  name: string;
  publicUrl: string;
};
