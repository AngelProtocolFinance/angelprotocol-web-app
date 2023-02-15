import { useEffect } from "react";
import { useLazyProfileQuery } from "services/aws/aws";
import { useErrorContext } from "contexts/ErrorContext";

export default function useLoadDefaultEndowmentName(
  endowId: number,
  setName: (name: string) => void
) {
  const { handleError } = useErrorContext();

  const [queryProfile] = useLazyProfileQuery();

  /**
   * some consumers can only store countryName:string
   * in this case, get flag for them when this component loads
   */
  useEffect(() => {
    (async () => {
      if (endowId === 0) {
        return;
      }

      try {
        const { data, isError, error } = await queryProfile(endowId);

        if (isError) {
          return handleError(error);
        }

        if (data) {
          setName(data.name);
        }
      } catch (e) {
        handleError(e);
      }
    })();
    // eslint-disable-next-line
  }, []);
}
