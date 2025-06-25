import { useEffect } from "react";

export function useClickOutside(
  ref: React.RefObject<HTMLDivElement | null>,
  handler: (event: MouseEvent) => void,
  when: boolean = true
) {
  useEffect(() => {
    if (!when) return;

    function listener(event: MouseEvent) {
      const target = event.target;
      if (
        !ref.current ||
        (target instanceof Node && ref.current.contains(target))
      ) {
        return;
      }
      handler(event);
    }

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler, when]);
}
