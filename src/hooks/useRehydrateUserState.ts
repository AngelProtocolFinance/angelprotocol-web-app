import { useEffect, useState } from "react";
import { loadLocalStorageUser } from "services/user/userSlice";
import { useGetter, useSetter } from "store/accessors";

// Redux re-hydrating should be happenning higher up in the component tree, perhaps in App.tsx
export default function useRehydrateUserState() {
  const [isLoading, setLoading] = useState(true);
  const user = useGetter((state) => state.user);
  const dispatch = useSetter();

  useEffect(() => {
    if (!user.ContactPerson.PK) {
      dispatch(loadLocalStorageUser());
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading };
}
