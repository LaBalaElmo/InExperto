import React from "react";

interface InterfaceRating {
  isNumber?: boolean;
}

export const Rating: React.FC<InterfaceRating> = ({ isNumber = true }) => {
  return (
    <div className="flex items-center justify-center py-2 gap-1">
      <div className="flex items-center justify-center w-4 h-4 bg-yellow-500 rounded-full">
        <p className="text-white font-bold"></p>
      </div>
      <div className="flex items-center justify-center w-4 h-4 bg-yellow-500 rounded-full">
        <p className="text-white font-bold"></p>
      </div>
      <div className="flex items-center justify-center w-4 h-4 bg-yellow-500 rounded-full">
        <p className="text-white font-bold"></p>
      </div>
      <div className="flex items-center justify-center w-4 h-4 bg-yellow-500 rounded-full">
        <p className="text-white font-bold"></p>
      </div>
      <div className="w-2 h-4 rounded-tl-full rounded-bl-full bg-yellow-500 border-2 border-yellow-500 border-solid">
        <p className="text-white font-bold"></p>
      </div>
      {isNumber && (
        <span className="ml-2 text-sm font-bold text-blue-950">(4.5/5)</span>
      )}
    </div>
  );
};
