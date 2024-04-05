import React from "react";

interface ListTitleNumberProps {
  title: string;
  description: string;
  titleColor?: string;
  descriptionColor?: string;
}

export const ListTitleNumber: React.FC<ListTitleNumberProps> = ({
  title,
  description,
  titleColor = "text-white",
  descriptionColor = "text-gray-300",
}) => {
  return (
    <div className={`flex items-center gap-2 ${titleColor}`}>
      {/* change title color */}
      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
      <div>
        <span>{title}</span>
        <p className={`text-xs ${descriptionColor} italic`}>{description}</p>
      </div>
    </div>
  );
};
