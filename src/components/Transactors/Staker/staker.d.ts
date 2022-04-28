declare module "@types-component/staker" {
  interface HaloStakingValues {
    // Values type
    amount: string;
    is_stake: boolean;
  }

  type Props = { isStake: boolean };
}
