import { useState } from "react";

export default function useFund() {
  const [isDonating, setDonating] = useState(false);

  function toggleDonate() {
    setDonating((prev) => !prev);
  }

  return { isDonating, toggleDonate };
}
