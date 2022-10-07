export function maskAddress(addr?: string) {
  if (!addr) {
    return "";
  } else {
    const middle = addr.substring(3, addr.length - 4);
    return addr.replace(middle, "...");
  }
}
