export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

export enum awsTags {
  airdrop = "airdrop",
  cha = "charity",
}

export enum chaTags {
  profile = "profile",
  profiles = "profiles",
}
