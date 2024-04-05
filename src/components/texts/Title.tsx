import React from "react";

interface InterfaceTitle {
    title: string;
    titleColor?: string;
}

export const Title: React.FC<InterfaceTitle> = ({
    title,
    titleColor = "text-blue-950",
}) => {
    return (
        <>
            <h1 className={`text-4xl font-bold ${titleColor} md:text-5xl`}>
                {title}
            </h1>
            <div className="w-20 h-1 bg-yellow-500 rounded-full"></div>
        </>
    );
};
