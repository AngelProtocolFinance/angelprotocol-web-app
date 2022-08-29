export interface AWSQueryRes<T> {
  Count: number;
  ScannedCount: number;
  Items: T;
}

export * from "./ap";
export * from "./ap/registration";
export * from "./apes";
export * from "./apes/donation";
export * from "./flipside";
