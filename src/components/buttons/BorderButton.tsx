import React from "react";

interface ListTitleNumberProps {
  children: React.ReactNode;
  textColor?: string;
  width?: string;
}

export const BorderButton: React.FC<ListTitleNumberProps> = ({
  children,
  textColor = "text-blue-950",
  width = "w-full",
}) => {
  return (
    <button
      className={`px-4 py-2 ${textColor} ${width} border-2 border-yellow-500 bg-transparent hover:bg-yellow-500 hover:text-white`}
    >
      {children}
    </button>
  );
};
