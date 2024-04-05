import React from "react";

interface SkillCardProps {
  title: string | React.ReactNode;
  content: string | React.ReactNode;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default SkillCard;
