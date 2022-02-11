export enum chains {
  terra = "terra",
  ethereum = "ethereum",
}

export type State = {
  [key in chains]: string;
};
