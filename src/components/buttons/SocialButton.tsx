import React, { useState } from "react";

interface Props {
    onClick: () => void;
    children?: React.ReactNode;
    theme?: "primary" | "secondary";
}

const buttonConfig = {
    primary: {
        bgColor: "bg-gray-200",
        textColor: "text-blue-800",
        bgColorHover: "hover:bg-gray-300",
        border: "border",
    },
    secondary: {
        bgColor: "bg-trasnparent",
        textColor: "text-white",
        bgColorHover: "hover:bg-teal-600",
        border: "border border-yellow-500",
    },
};

const SocialButton: React.FC<Props> = ({
    onClick,
    children,
    theme = "primary",
}) => {
    const [checked, setChecked] = useState(true);

    return (
        <button
            className={`flex items-center justify-center w-8 h-8 ${buttonConfig[theme].bgColor} ${buttonConfig[theme].textColor} ${buttonConfig[theme].bgColorHover} ${buttonConfig[theme].border}`}
            onClick={() => {
                onClick();
                setChecked(!checked);
            }}
        >
            {children}
        </button>
    );
};

export default SocialButton;
