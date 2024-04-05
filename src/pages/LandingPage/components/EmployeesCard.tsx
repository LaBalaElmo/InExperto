import React from "react";
import { ListTitleNumber } from "../../../components/decorations/ListTitleNumber";
import imageTest from "../../../assets/images/logo_inexoert.png";
import { BorderButton } from "../../../components/buttons/BorderButton";
import { EmployeeCard } from "../../../models/Pages/LandinPage";

export const EmployeesCard: React.FC<EmployeeCard> = ({
  id,
  title,
  description,
  image,
  items,
}) => {
  return (
    <div
      key={id}
      className="flex justify-center items-center align-middle w-full flex-col md:flex-row gap-4 mt-10"
    >
      <div className="flex flex-col items-center justify-center p-4 border-4 border-gray-400">
        <img src={image || imageTest} alt={description} />
      </div>
      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-bold text-blue-950 md:text-3xl">
          {title}
        </h2>
        <p className="text-lg text-gray-500 md:text-xl">{description}</p>
        <div className="flex  gap-4 justify-center">
          {items?.map((item, index) => (
            <ListTitleNumber
              key={index}
              titleColor="text-blue-950"
              descriptionColor="text-gray-500"
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <BorderButton>Learn More</BorderButton>
      </div>
    </div>
  );
};
