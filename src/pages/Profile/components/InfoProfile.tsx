// import React from "react";
import { InfoCard } from "./InfoCard";
import { Title } from "../../../components/texts/Title";
import { SkeletonParagraph } from "../../../components/skeleton/SkeletonParagraph";

interface InterfaceInfoProfile {
  classNames?: string;
  description?: string;
  info?: {
    country: string | null;
    language: string | null;
    speciality: string | null;
    birthday: string | null;
    social: string[] | null;
  };
  name: string;
}

export const InfoProfile: React.FC<InterfaceInfoProfile> = ({
  classNames,
  description = null,
  info = {
    country: null,
    language: null,
    speciality: null,
    birthday: null,
    social: null,
  },
  name,
}) => {
  return (
    <div
      className={`flex mt-14 py-10 flex-col md:flex-row gap-4 justify-between ${classNames}`}
    >
      <div className="md:w-1/2 px-5 md:px-0 md:pr-5">
        <InfoCard info={info} classNames={classNames} />
      </div>
      <div className="md:w-1/2 text-gray-500 px-5 md:px-0 md:pl-5">
        <Title title={name} />
        <p>{description || <SkeletonParagraph />}</p>
      </div>
    </div>
  );
};
