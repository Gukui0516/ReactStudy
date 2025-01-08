import React, { useRef, useEffect } from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const outerDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current!;
      const pageHeight = window.innerHeight;

      if (deltaY > 0) {
        // 스크롤 내릴 때
        const nextPage = Math.min(
          scrollTop + pageHeight,
          (React.Children.count(children) - 1) * pageHeight
        );
        outerDivRef.current!.scrollTo({
          top: nextPage,
          behavior: "smooth",
        });
      } else {
        // 스크롤 올릴 때
        const prevPage = Math.max(scrollTop - pageHeight, 0);
        outerDivRef.current!.scrollTo({
          top: prevPage,
          behavior: "smooth",
        });
      }
    };

    const outerDiv = outerDivRef.current!;
    outerDiv.addEventListener("wheel", handleWheel);
    return () => {
      outerDiv.removeEventListener("wheel", handleWheel);
    };
  }, [children]);

  return (
    <div ref={outerDivRef} className="h-screen overflow-y-auto scrollbar-hide">
      {children}
    </div>
  );
};

export default PageWrapper;
