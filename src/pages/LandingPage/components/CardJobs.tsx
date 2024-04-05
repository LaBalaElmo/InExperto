import React from "react";
import { ListTitleNumber } from "../../../components/decorations/ListTitleNumber";

interface InterfaceCardJobs {
  title: string;
  description: string;
  numberJobs: string;
  numberLength: string;
}

export const CardJobs: React.FC<InterfaceCardJobs> = ({
  title,
  description,
  numberJobs,
  numberLength,
}) => {
  return (
    <div className="flex bg-white rounded-sm shadow-lg p-10 w-full flex-col gap-5">
      <h2 className="text-xl font-bold text-blue-950 md:text-2xl text-start">
        {title}
      </h2>
      <div className="flex flex-col items-center justify-center text-start text-gray-500">
        {description}
      </div>
      <div className="flex flex-col md:flex-row items-start justify-start text-start text-gray-500 gap-10">
        <ListTitleNumber
          titleColor="text-blue-950"
          descriptionColor="text-gray-500"
          title="Jobs"
          description={numberJobs}
        />
        <ListTitleNumber
          titleColor="text-blue-950"
          descriptionColor="text-gray-500"
          title="Length"
          description={numberLength}
        />
      </div>
    </div>
  );
};
