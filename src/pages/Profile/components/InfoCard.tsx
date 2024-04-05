import React from "react";
import { Info } from "./Info";
import UseAnimations from "react-useanimations";
import facebook from "react-useanimations/lib/facebook";
import twitter from "react-useanimations/lib/twitter";
import linkedin from "react-useanimations/lib/linkedin";

interface InterfaceInfoCard {
  info?: {
    country: string | null;
    language: string | null;
    speciality: string | null;
    birthday: string | null;
    social: string[] | null;
  };
  classNames?: string;
}

export const InfoCard: React.FC<InterfaceInfoCard> = ({
  info = {
    country: null,
    language: null,
    speciality: null,
    birthday: null,
    social: null,
  },
  classNames,
}) => {
  const dateString = info.birthday ? new Date(info.birthday) : null;
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-md bg-white w-full p-5 md:p-10 flex flex-col gap-2 ${classNames}}`}
    >
      <Info title="Country">{info.country}</Info>
      <Info title="Language">{info.country}</Info>
      <Info title="Speciality">{info.country}</Info>
      <Info title="Birthday">{dateString?.toLocaleDateString()}</Info>
      <Info title="Social">
        <div className="flex justify-center gap-x-2">
          <UseAnimations
            animation={facebook}
            strokeColor="var(--color-primary)"
            className="hover:bg-gray-200"
          />
          <UseAnimations
            animation={twitter}
            strokeColor="var(--color-primary)"
            className="hover:bg-gray-200"
          />
          <UseAnimations
            animation={linkedin}
            strokeColor="var(--color-primary)"
            className="hover:bg-gray-200"
          />
        </div>
      </Info>
    </div>
  );
};
