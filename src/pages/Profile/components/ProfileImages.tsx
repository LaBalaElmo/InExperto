// import React from "react";
import defultImage from "../../../assets/backgorund/gray.png";
import backgroundDefault from "../../../assets/backgorund/gray.png";

interface InterfaceProfileImages {
  bannerImgSrc?: string;
  profileImgSrc?: string;
  classNames?: string;
}

const ProfileImages = ({
  bannerImgSrc,
  profileImgSrc,
  classNames,
}: InterfaceProfileImages) => {
  return (
    <div className={`relative ${classNames}`}>
      <div
        className="h-64 mx-auto  bg-cover bg-center rounded-md"
        style={{
          backgroundImage: bannerImgSrc
            ? `url(${bannerImgSrc})`
            : `url(${backgroundDefault})`,
        }}
      />
      <div className="absolute bottom-0 left-0 md:left-5 sm:ml-4 -mb-16">
        <div className="rounded-full border-4 border-white h-32 w-32 bg-white flex items-center justify-center">
          <img
            className="w-24 h-24 object-cover rounded-full"
            src={profileImgSrc || defultImage}
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImages;
