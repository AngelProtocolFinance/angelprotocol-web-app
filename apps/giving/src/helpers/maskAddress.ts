export function maskAddress(addr: string | undefined, numOfChars = 6): string {
  if (!addr) {
    return "";
  } else {
    const len = addr.length;
    const middle = addr.substring(numOfChars, len - numOfChars);
    return addr.replace(middle, "...");
  }
}
