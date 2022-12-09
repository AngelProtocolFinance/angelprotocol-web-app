export type FlatListOption<T> = {
  value: T;
  displayText: string;
};

export type GroupProps<T> = {
  label: string;
  selectedValues: T[];
  options: FlatListOption<T>[];
  onChange: (options: T[]) => void;
};
