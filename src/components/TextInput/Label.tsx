export function Label({
  className = "",
  required,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
}) {
  return (
    <label {...props} className={`${className} block text-sm text-inherit`}>
      <span>{props.children}</span>
      {required === undefined ? null : required ? (
        <span className="ml-1 text-red-l1 dark:text-red-l2">*</span>
      ) : (
        <span className="ml-1 text-gray-d1 dark:text-gray">(optional)</span>
      )}
    </label>
  );
}
