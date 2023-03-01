import { TWhitelists } from "slices/launchpad/types";
import { isEmpty } from "helpers";
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
      <h5>Contributors</h5>

      {isEmpty(donors) ? (
        <p>Anyone can contribute to this AIF</p>
      ) : (
        <ul>{donors}</ul>
      )}

      <h5>Beneficiaries</h5>
      {isEmpty(withdrawers) ? (
        <p>Only the multisig wallet can withdraw funds</p>
      ) : (
        <ul>{withdrawers}</ul>
      )}
    </Section>
  );
}
