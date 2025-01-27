import { unpack } from "helpers";
import { Suspense, forwardRef, lazy } from "react";
import ContentLoader from "../content-loader";
import type { Props } from "./types";
const Editor = lazy(() => import("./editor"));

type El = Pick<HTMLDivElement, "focus">;
export const RichText = forwardRef<El, Props>(({ classes, ...props }, ref) => {
  const style = unpack(classes);

  return (
    <div className={style.container}>
      <div
        aria-invalid={!!props.error}
        aria-disabled={props.disabled}
        className={`relative has-focus-within:ring-2 ring-blue-d1 ring-offset-1 ${style.field} ${props.readOnly ? "toolbar-hidden" : ""}`}
      >
        <Suspense
          fallback={
            <>
              {Array(10)
                .fill(null)
                .map((_, index) => (
                  <ContentLoader key={index} className="mb-3 h-5 w-full" />
                ))}
            </>
          }
        >
          {<Editor classes={classes} ref={ref} {...props} />}
        </Suspense>
        {!props.readOnly && (
          <span
            className={`absolute top-4 right-4 text-xs uppercase ${
              style.counter ?? ""
            }`}
          >
            chars : {props.content.length ?? 0}
            {props.charLimit && ` /${props.charLimit}`}
          </span>
        )}
      </div>
      <p className={`empty:hidden text-red-d1 text-xs mt-1 ${style.error}`}>
        {props.error}
      </p>
    </div>
  );
});

export default RichText;
