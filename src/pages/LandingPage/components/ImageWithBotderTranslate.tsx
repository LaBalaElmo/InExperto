import React from "react";
import defaultImg from "../../../assets/images/logo_inexoert.png";

interface InterfaceImageWithBotderTranslate {
  image?: string;
}

export const ImageWithBotderTranslate: React.FC<
  InterfaceImageWithBotderTranslate
> = ({ image }) => {
  return (
    <>
      <div className="absolute border-8 transform translate-x-5 translate-y-5 border-yellow-300 w-64 h-80"></div>
      <img
        className="z-10 object-cover w-64 h-80"
        src={image || defaultImg}
        alt="image"
      />
    </>
  );
};
