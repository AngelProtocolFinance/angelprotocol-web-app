//NOTE: will be removed after admin refactor PR
export function idParamToNum(id?: string | number) {
  if (id === undefined) {
    return 0;
  } else {
    const numId = Number(id);
    return isNaN(numId)
      ? 0
      : numId < 1 && numId > 0 //[0,1) used as AP ids
      ? numId
      : Math.floor(numId);
  }
}
