import React from "react";
import { AllianceEditValues as AV } from "pages/Admin/types";
import { GroupContainer } from "components/admin";
import { TextInput } from "components/form";
import useEditMember from "./useEditMember";

export default function MemberEditor() {
  const { resetEdit, editMember, isEditingMember } = useEditMember();

  return (
    <GroupContainer>
      <TextInput<AV>
        classes="field-group-admin-sec"
        label="Wallet address"
        name="wallet"
        placeholder="juno123abc..."
        disabled={isEditingMember}
        required
      />
      <TextInput<AV>
        classes="field-group-admin-sec"
        label="Member name"
        name="name"
        required
      />
      <TextInput<AV>
        classes="field-group-admin-sec"
        label="Logo url"
        name="logo"
        placeholder="https://mysite/logo.jpg"
        required
      />
      <TextInput<AV>
        classes="field-group-admin-sec"
        label="Website"
        name="website"
        placeholder="https://mysite.com"
        required
      />
      <div className="flex gap-2 justify-self-end">
        <Button
          type="button"
          onClick={editMember}
          _accent={` ${isEditingMember ? "bg-orange" : "bg-green"}`}
        >
          {isEditingMember ? "save changes" : "+ add member"}
        </Button>
        {isEditingMember && (
          <Button type="button" onClick={resetEdit} _accent="bg-red">
            cancel
          </Button>
        )}
      </div>
    </GroupContainer>
  );
}

function Button({
  _accent = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { _accent?: string }) {
  return (
    <button
      {...props}
      className={`font-bold text-xs uppercase px-4 py-2 rounded-sm ${_accent}`}
    />
  );
}
