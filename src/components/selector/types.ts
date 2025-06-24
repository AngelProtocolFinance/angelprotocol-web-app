export type Classes = {
  container?: string;
  button?: string;
  options?: string;
  option?: string;
};

export interface BaseProps {
  placeholder?: string;
  disabled?: boolean;
  classes?: Classes;
}
