// import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Steps } from "components/donation";
import { useSetter } from "store/accessors";
import { setRecipient } from "slices/donation";

export default function Content(props: {
  id: number;
  name: string;
  isKYCRequired: boolean;
}) {
  const dispatch = useSetter();

  useEffect(() => {
    dispatch(setRecipient(props));
  }, [dispatch, props]);

  return <Steps />;
}
