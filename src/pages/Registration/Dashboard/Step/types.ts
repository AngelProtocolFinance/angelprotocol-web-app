export type BaseProps = {
  title: string;
  isComplete?: boolean;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
