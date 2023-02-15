export type FormValues = {
  purchaser: string;
  recipient: { name: string; email: string };
  message: string;

  //meta
  secret: string;
};
