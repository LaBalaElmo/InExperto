import React from "react";

interface InterfaceNumberWithSubtitle {
  title: string;
  subtitle: string;
}

export const NumberWithSubtitle: React.FC<InterfaceNumberWithSubtitle> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-blue-950 md:text-5xl">{title}</h1>
      <p className="text-lg text-gray-600">{subtitle}</p>
    </div>
  );
};
