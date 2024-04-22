import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../state/UserState";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "patch",
        url: "/api/user/makeAdmin",
        data: {
          email,
        },
        headers: {
          authToken: localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        alert(`User with email "${email}" has been made Admin`);
      }
    } catch (error) {
      alert(error.message + " check the email");
    }
  };

  useEffect(() => {
    if (user.role !== "SUPERADMIN") {
      navigate("/");
    }
  }, [user.role, navigate]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#2D89C8] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update Role
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeAdmin;
