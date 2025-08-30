import { createElement } from "react";

interface Props {
  el: string;
  classes?: string;
  a: number;
  b: number;
  formatter: (a: number | string) => string | number;
}
export const Diff = ({ el, classes, formatter, a, b }: Props) => {
  const diff = b - a;
  if (Math.abs(diff) <= 0.01) {
    return createElement(el as any, {
      className: classes,
      children: formatter(b),
    });
  }

  if (diff > 0) {
    return createElement(el as any, {
      className: `${classes} text-green`,
      children: (
        <>
          {formatter(b)} <span className="text-2xs">(+{formatter(diff)})</span>
        </>
      ),
    });
  }

  return createElement(el as any, {
    className: `${classes} text-red`,
    children: (
      <>
        {formatter(b)}{" "}
        <span className="text-2xs">(-{formatter(Math.abs(diff))})</span>
      </>
    ),
  });
};
