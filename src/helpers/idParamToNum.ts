export default function idParamToNum(id?: string): number {
  if (!id) return 0;
  const numId = Number(id);
  return isNaN(numId) ? 0 : Math.floor(numId);
}
