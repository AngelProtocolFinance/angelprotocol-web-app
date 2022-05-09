interface DashLink {
  setLink: () => void;
  active: boolean;
  text: string;
}

export default function DashLink({ setLink, active, text }: DashLink) {
  const tailwindCss = `cursor-pointer font-heading uppercase font-bold text-4xl mt-4 text-white-grey ${
    active ? "" : "opacity-50"
  }`;

  return (
    <h2 onClick={setLink} className={tailwindCss}>
      {text}
    </h2>
  );
}
