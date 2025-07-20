export function mask_string(str: string | undefined, num_of_chars = 6): string {
  if (!str) {
    return "";
  } else {
    const len = str.length;
    const middle = str.substring(num_of_chars, len - num_of_chars);
    return str.replace(middle, "...");
  }
}
