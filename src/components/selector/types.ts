export type Classes = {
  container?: string;
  button?: string;
  options?: string;
  option?: string;
  label?: string;
};

export interface BaseProps {
  placeholder?: string;
  disabled?: boolean;
  classes?: Classes;
}
