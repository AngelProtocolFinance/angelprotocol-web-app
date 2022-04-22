export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

export enum awsTags {
  airdrop = "airdrop",
  admin = "admin",
  cha = "charity",
}

export enum chaTags {
  profile = "profile",
  profiles = "profiles",
}

export enum adminTags {
  applications = "applications",
}
