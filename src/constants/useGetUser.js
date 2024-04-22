import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetUser(initial) {
  const [user, setUser] = useState(initial);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios({
        method: "get",
        url: "/api/user/getUser",
        headers: {
          authToken: localStorage.getItem("token"),
        },
      });
      if (res.data.success === true) {
        setUser(res.data.User);
      } else {
        alert("Could not get User");
      }
    };

    getUser();
  }, []);

  return [user, setUser];
}
