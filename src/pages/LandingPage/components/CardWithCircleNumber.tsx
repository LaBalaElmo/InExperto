import React from "react";

interface InterfaceCardWithCircleNumber {
  number: string;
  text: string;
}

export const CardWithCircleNumber: React.FC<InterfaceCardWithCircleNumber> = ({
  number,
  text,
}) => {
  return (
    <div className="bg-blue-50 rounded-sm shadow-lg p-10 w-full flex-col">
      <div className="w-10 h-10 mt-4 bg-yellow-500 rounded-full text-xl font-bold text-blue-950 md:text-lg self-center items-center align-middle justify-center flex">
        {number}
      </div>
      <div className="flex flex-col items-center justify-center text-start">
        {text}
      </div>
    </div>
  );
};
