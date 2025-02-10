interface Props {
  aspect: [number, number];
  classes?: string;
}

const fixedSizes: { [aspect: string]: string | undefined } = {
  "4/1": "1584 x 396",
  "2/1": "792 x 396",
  "1/1": "315 x 315",
};

export function AspectTooltip({ aspect, classes = "" }: Props) {
  const [w, h] = aspect;
  const fixed = fixedSizes[`${w}/${h}`];

  if (!fixed) return null;
  return (
    <span className={classes}>
      {w}:{h} &ndash; {fixed} pixels &#40;recommended&#41;
    </span>
  );
}
