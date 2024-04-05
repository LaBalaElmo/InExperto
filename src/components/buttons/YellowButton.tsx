import React from "react";

interface YellowButtonProps {
  onClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  children?: React.ReactNode;
  width?: string;
}

export const YellowButton: React.FC<YellowButtonProps> = ({
  onClick,
  type = "button",
  children,
  width = "w-full",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-yellow-500 text-blue-950 px-4 py-2 text-sm font-medium ${width} hover:bg-yellow-600`}
    >
      {children}
    </button>
  );
};
