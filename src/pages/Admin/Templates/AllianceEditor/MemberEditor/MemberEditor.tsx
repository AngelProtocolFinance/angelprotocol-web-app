import TextInput from "pages/Admin/components/TextInput";
import React from "react";
import { AllianceEditValues as AV } from "../alllianceEditSchema";
import useEditMember from "./useEditMember";

export default function MemberEditor() {
  const { resetEdit, editMember, isEditingMember } = useEditMember();

  return (
    <div className="shadow-inner-white-grey bg-light-grey rounded-md p-3 grid">
      <TextInput<AV>
        title="Wallet address"
        name="wallet"
        placeholder="terra123abc..."
        disabled={isEditingMember}
        plain
        required
        mono
      />
      <TextInput<AV> title="Member name" name="name" plain required />
      <TextInput<AV>
        title="Logo url"
        name="logo"
        placeholder="https://mysite/logo.jpg"
        mono
        plain
        required
      />
      <TextInput<AV>
        title="Website"
        name="website"
        placeholder="https://mysite.com"
        mono
        plain
        required
      />
      <div className="flex gap-2 justify-self-end">
        <Button
          type="button"
          onClick={editMember}
          _accent={` ${isEditingMember ? "bg-angel-orange" : "bg-green-400"}`}
        >
          {isEditingMember ? "save changes" : "+ add member"}
        </Button>
        {isEditingMember && (
          <Button type="button" onClick={resetEdit} _accent="bg-red-400">
            cancel
          </Button>
        )}
      </div>
    </div>
  );
}

function Button({
  _accent = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { _accent?: string }) {
  return (
    <button
      {...props}
      className={`font-bold text-xs uppercase px-4 py-2 rounded-sm text-white ${_accent}`}
    />
  );
}
