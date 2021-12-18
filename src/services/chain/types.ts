export enum chains {
  terra = "terra",
}

export type State = {
  [key in chains]: string;
};
