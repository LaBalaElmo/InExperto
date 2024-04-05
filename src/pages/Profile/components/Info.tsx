import React from "react";

interface InterfaceInfoCard {
  children: React.ReactNode;
  title: string;
}

export const Info: React.FC<InterfaceInfoCard> = ({ children, title }) => {
  return (
    <p className="text-blue-950 font-sans flex justify-between">
      {title}: <span className="text-gray-400 font-thin">{children}</span>
    </p>
  );
};
