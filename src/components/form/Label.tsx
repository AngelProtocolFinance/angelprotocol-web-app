export function Label({
  className = "",
  required,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  /**
   * UI depending on the value:
   *
   * - `true` - a red '*' (star) next to the label
   * - `false` - text '(optional)' next to the label
   * - `undefined` - nothing appears next to the label
   */
  required?: boolean;
}) {
  return (
    <label
      {...props}
      className={`${className} block text-sm after:ml-1 ${
        required !== undefined
          ? required
            ? "after:content-['*'] after:text-red"
            : "after:content-['(optional)'] after:text-navy-l1 after:dark:text-navy-l2"
          : ""
      }`}
    >
      {props.children}
    </label>
  );
}
