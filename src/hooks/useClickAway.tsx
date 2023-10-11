import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

function useClickAway(
  ref: RefObject<HTMLDivElement>,
  setState: Dispatch<SetStateAction<boolean>>,
) {
  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node))
      setState(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}

export default useClickAway;
