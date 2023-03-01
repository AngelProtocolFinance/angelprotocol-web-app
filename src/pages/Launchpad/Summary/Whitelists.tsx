import { TWhitelists } from "slices/launchpad/types";
import { isEmpty } from "helpers";
import Info from "../common/Info";
import Section, { SectionProps } from "./Section";

export default function Whitelists({
  contributors,
  beneficiaries,
  ...props
}: SectionProps<TWhitelists>) {
  const donors = contributors.map((c) => <li key={c}>{c}</li>);
  const withdrawers = beneficiaries.map((b) => <li key={b}>{b}</li>);

  return (
    <Section {...props}>
      <p className="font-semibold mb-2">Contributors:</p>

      {isEmpty(donors) ? (
        <Info>Anyone can contribute to this AIF</Info>
      ) : (
        <ul className="list-disc list-inside grid gap-2">{donors}</ul>
      )}

      <p className="font-semibold mb-2 mt-6">Beneficiaries:</p>
      {isEmpty(withdrawers) ? (
        <Info>Only the multisig wallet can withdraw funds</Info>
      ) : (
        <ul className="list-disc list-inside grid gap-2">{withdrawers}</ul>
      )}
    </Section>
  );
}
