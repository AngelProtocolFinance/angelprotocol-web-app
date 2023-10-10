export type FilterOption<T> = {
  key?: string | number;
  value: T;
  displayText: string;
};

export type GroupProps<T> = {
  key?: string | number;
  classes?: string;
  label: string;
  selectedValues: T[];
  options: FilterOption<T>[];
  onChange: (options: T[]) => void;
};
