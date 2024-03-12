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
    <label data-required={required} {...props} className={`${className} label`}>
      {props.children}
    </label>
  );
}
