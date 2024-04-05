import React from "react";

interface InterfaceCompany {
    svg?: React.ReactNode;
    title?: string;
    description?: string;
}

export const Company: React.FC<InterfaceCompany> = ({
    // svg,
    title,
    description,
}) => {
    return (
        <div className="flex flex-col p-10 text-center justify-center items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-blue-950"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    className="text-blue-950"
                    d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm3.5 14.5H6.5v-9h7v9z"
                    clipRule="evenodd"
                />
            </svg>
            <p className="text-lg text-gray-600">{title}</p>
            {/* description */}
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};
