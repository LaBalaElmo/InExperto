import { ReactNode } from "react";
import { motion } from "framer-motion";

const buttonConfig = {
    primary: {
        bgColor: "bg-amber-400",
        textColor: "text-black",
        bgColorHover: "hover:bg-amber-500",
        textColorHover: "hover:text-white",
    },
    secondary: {
        bgColor: "bg-teal-500",
        textColor: "text-gray-900",
        bgColorHover: "hover:bg-teal-600",
        textColorHover: "hover:text-black",
    },
};

type ButtonProps = {
    onClick?: () => void;
    theme?: keyof typeof buttonConfig;
    children: ReactNode;
};

function CustomButton({ onClick, theme = "primary", children }: ButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            onClick={onClick}
            className={`${buttonConfig[theme]?.bgColor} ${buttonConfig[theme]?.textColor} ${buttonConfig[theme]?.bgColorHover} ${buttonConfig[theme]?.textColorHover} p-2 rounded-md w-full`}
        >
            {children}
        </motion.button>
    );
}

export default CustomButton;
