import React from "react";

export default function Label(props: { text: string; id: string }) {
  return (
    <label
      htmlFor={props.id}
      className="text-xs font-heading font-semibold uppercase text-white/100"
    >
      {props.text}
    </label>
  );
}
