type Name = [string, string];
type Value = [string, any];
type Expression = string;

type UpdateComps = {
  names: Name[];
  values: Value[];
  exps: Expression[];
};
type ReplaceFields = Record<string, any>;

const getComps = (
  fields: ReplaceFields,
  path = "",
  type: "set" | "remove" = "set"
) => {
  const comps: UpdateComps = {
    exps: [],
    names: [],
    values: [],
  };

  const kvs = Object.entries(fields);
  for (const [k, v] of kvs) {
    const alias = `${path && `#${path}.`}#${k}`;
    const placeholder = `:${path}${k}`;

    comps.names.push([`#${k}`, k]);

    if (type === "set") {
      comps.exps.push(`${alias} = ${placeholder}`);
      comps.values.push([placeholder, v]);
    } else {
      /** attribute removal doesn't need value */
      comps.exps.push(alias);
    }
  }

  if (path && kvs.length > 0) {
    comps.names.push([`#${path}`, path]);
  }

  return comps;
};

export const buildProfileUpdateParams = (fields: ReplaceFields) => {
  const socMedKey = "social_media_urls";
  const { [socMedKey]: socMedUrls, slug, ...replaceUpdate } = fields;

  const comps = {
    set: {
      socials: getComps(socMedUrls ?? {}, socMedKey),
      slug: getComps(slug ? { slug } : {}),
      rest: getComps(replaceUpdate),
    },
    remove: {
      slug: getComps(slug === "" ? { slug } : {}, undefined, "remove"),
    },
  };
  const setComps = Object.values(comps.set);
  const removeComps = Object.values(comps.remove);
  const expression = [
    { action: "SET", exps: setComps.flatMap((s) => s.exps).join(",") },
    { action: "REMOVE", exps: removeComps.flatMap((s) => s.exps).join(",") },
  ]
    .filter((x) => x.exps)
    .map((x) => `${x.action} ${x.exps}`)
    .join(" ");

  const updateComps = setComps.concat(removeComps);
  const names = updateComps
    .flatMap((x) => x.names)
    .reduce((p, [k, v]) => ({ ...p, [k]: v }), {});
  const values = updateComps
    .flatMap((x) => x.values)
    .reduce(
      (p, [k, v]) => ({ ...p, [k]: v }),
      undefined as any // values may be empty (comp is REMOVE only) and should be reduced to undefined
    );

  return {
    UpdateExpression: expression,
    ExpressionAttributeNames: names,
    ExpressionAttributeValues: values,
  };
};

export const dbUpdate = (fields: ReplaceFields) => {
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
