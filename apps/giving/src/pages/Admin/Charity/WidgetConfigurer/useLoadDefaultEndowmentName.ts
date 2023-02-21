import { useErrorContext } from "@ap/errors";
import { useLazyProfileQuery } from "@ap/services/aws";
import { useEffect } from "react";

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
