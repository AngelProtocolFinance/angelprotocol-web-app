//NOTE: will be removed after admin refactor PR
export function idParamToNumber(id?: string | number) {
  if (id === undefined) {
    return 0;
  } else {
    return isNaN(id as unknown as number) ? 0 : Math.floor(+id);
  }
}
