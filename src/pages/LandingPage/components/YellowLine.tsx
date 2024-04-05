import React from "react";

interface InterfaceYellowLine {
  className?: string;
}

export const YellowLine: React.FC<InterfaceYellowLine> = ({
  className = "md:w-1 md:h-20 w-20 h-1",
}) => {
  return <div className={`${className} bg-yellow-500`}></div>;
};
