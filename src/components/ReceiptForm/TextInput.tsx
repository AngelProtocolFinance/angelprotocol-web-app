type TextInputProps = {
  register: any;
  placeholder: string;
  id: string;
  name: string;
};

export default function TextInput(props: TextInputProps) {
  return (
    <div className="grid">
      <input
        {...props.register(props.name)}
        autoComplete="off"
        id={props.id}
        type="text"
        placeholder={props.placeholder}
        className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
      />
    </div>
  );
}
