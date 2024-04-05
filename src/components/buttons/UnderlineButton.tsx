import React from "react";

interface UnderlineButtonProps {
    onClick: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    children?: React.ReactNode;
    theme?: "primary" | "secondary";
}

const buttonConfig = {
    primary: {
        textColor: "text-white",
        borderColor: "border-white",
        textHover: "hover:text-gray-400",
        borderHover: "hover:border-gray-400",
        padding: "px-3 py-2",
    },
    secondary: {
        textColor: "text-blue-700",
        borderColor: "border-blue-700",
        textHover: "hover:text-blue-900",
        borderHover: "hover:border-blue-900",
        padding: "py-1",
    },
};

export const UnderlineButton: React.FC<UnderlineButtonProps> = ({
    onClick,
    type = "button",
    children,
    theme = "primary",
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`bg-transparent text-sm font-medium border-b-2 ${buttonConfig[theme].padding} ${buttonConfig[theme]?.textColor} ${buttonConfig[theme]?.borderColor} ${buttonConfig[theme]?.textHover} ${buttonConfig[theme]?.borderHover}`}
        >
            {children}
        </button>
    );
};
