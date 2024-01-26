import { createRef, useEffect } from "react";

export const useScrollToBottom = (callback: () => void) => {
  const scrollRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = scrollRef.current;
      if (
        scrollElement &&
        scrollElement.scrollTop + scrollElement.clientHeight >=
          scrollElement.scrollHeight
      ) {
        // User has scrolled to the bottom
        callback();
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);

      return () => {
        // Cleanup: remove the event listener when the component unmounts
        scrollElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [callback, scrollRef]);

  return scrollRef;
};
