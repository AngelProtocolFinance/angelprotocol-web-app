export const dbUpdate = (fields: Record<string, any>) => {
  const comps = Object.entries(fields).map(([k, v]) => ({
    exp: `#${k} = :${k}`,
    name: [`#${k}`, k],
    value: [`:${k}`, v],
  }));

  return {
    UpdateExpression: `SET ${comps.map(({ exp }) => exp).join(",")}`,
    ExpressionAttributeNames: comps.reduce(
      (p, { name: [n, _n] }) => ({ ...p, [n]: _n }),
      {}
    ),
    ExpressionAttributeValues: comps.reduce(
      (p, { value: [v, _v] }) => ({ ...p, [v]: _v }),
      {}
    ),
  };
};
