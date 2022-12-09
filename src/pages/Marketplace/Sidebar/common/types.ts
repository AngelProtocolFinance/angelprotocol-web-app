export type FlatListOption<T> = {
  key?: string | number;
  value: T;
  displayText: string;
};

export type GroupProps<T> = {
  key?: string | number;
  label: string;
  selectedValues: T[];
  options: FlatListOption<T>[];
  onChange: (options: T[]) => void;
};
