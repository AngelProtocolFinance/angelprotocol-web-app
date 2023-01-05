import { useEffect } from "react";

export default function useScrollTo(id: string) {
  useEffect(() => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    console.log("hola");
  }, [id]);
}
