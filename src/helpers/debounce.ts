export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = callback(...args);
    }, waitFor);
    return result;
  };
};
