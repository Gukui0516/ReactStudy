import React from "react";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const Page: React.FC<PageProps> = ({ children, className }) => {
  return (
    <div
      className={`h-screen flex items-center justify-center text-6xl ${className}`}
    >
      {children}
    </div>
  );
};

export default Page;
