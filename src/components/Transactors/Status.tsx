import { PropsWithChildren, ReactNode, useState } from "react";
import Icon from "components/Icon";
import { useGetter } from "store/accessors";

export default function Status({ classes = "" }: { classes?: string }) {
  const [detailsShown, showDetails] = useState(false);
  const { form_error } = useGetter((state) => state.transaction);

  function toggleErrorDetails() {
    showDetails((prev) => !prev);
  }

  if (!form_error) {
    return null;
  } else if (typeof form_error === "string") {
    return (
      <StatusDiv classes={classes}>
        <Icon type="Info" />
        <StatusTitle text={form_error} />
      </StatusDiv>
    );
  } else {
    return (
      <StatusDiv classes={classes}>
        <Icon type="Info" />
        <StatusTitle text={form_error.title} />
        {form_error.details && (
          <button
            onClick={toggleErrorDetails}
            type="button"
            className={`absolute  top-1/2 right-1 transform -translate-y-1/2 transition ${
              detailsShown ? "-rotate-90" : "rotate-0"
            }`}
          >
            <Icon type="CaretLeft" />
          </button>
        )}
        {detailsShown && (
          <p className="col-span-2 font-mono text-xs mt-1">
            {form_error.details}
          </p>
        )}
      </StatusDiv>
    );
  }
}

function StatusDiv({
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string }>) {
  return (
    <div
      className={`relative grid grid-cols-[auto_1fr] items-center bg-red-400/20 p-2 rounded-md text-angel-grey ${classes}`}
    >
      {children}
    </div>
  );
}
function StatusTitle(props: { text: string }) {
  return <span className="font-mono text-xs ml-1">{props.text}</span>;
}
