import { PropsWithChildren } from "react";

type Props = { currentLevel?: number };

export default function LevelDescription({ currentLevel = 0 }: Props) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <LevelSection colored={currentLevel >= 1}>
        <Header>Level 1</Header>
        <p>
          Your organization is eligible to create its endowment. Donors can
          donate funds through your organization’s landing page on Angel
          Protocol’s interface. Your organization is not displayed on the
          marketplace and cannot be found through the search bar.
        </p>
      </LevelSection>
      <LevelSection colored={currentLevel >= 2}>
        <Header>Level 2</Header>
        <p>
          All benefits from Level 1 + your organization will be visible in the
          marketplace.
        </p>
      </LevelSection>
      <LevelSection colored={currentLevel === 3}>
        <Header>Level 3</Header>
        <p>
          All benefits from Level 2 + your organization will be able to receive
          automatic donations from members of the Angel Charity Alliance.
        </p>
      </LevelSection>
    </div>
  );
}

type LevelProps = PropsWithChildren<{ colored: boolean }>;

const LevelSection = ({ colored, children }: LevelProps) => {
  const styles = colored
    ? "ring ring-angel-blue rounded-md bg-angel-blue bg-opacity-50"
    : "";
  return (
    <div className={`flex flex-col text-left p-1 ${styles}`}>{children}</div>
  );
};

const Header = ({ children }: PropsWithChildren<{}>) => (
  <h3 className="text-lg font-bold">{children}</h3>
);
