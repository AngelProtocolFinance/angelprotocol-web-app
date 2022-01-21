import { useProfileQuery } from "services/aws/endowments/endowments";
import { profile as profile_placeholder } from "services/aws/endowments/placeholders";

export default function useProfile(address: string) {
  const { data } = useProfileQuery(address);
  return data || profile_placeholder;
}
