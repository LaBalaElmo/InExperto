import { IconoirProvider } from "iconoir-react";
import { CSSProperties, ReactNode } from "react";

type IconButtonProps = {
    icon: ReactNode;
    onClick: () => void;
    style?: CSSProperties;
    children?: ReactNode;
};

function IconButton({ icon, onClick, style, children }: IconButtonProps) {
    return (
        <button
            className="flex gap-1 place-items-center hover:text-white"
            onClick={onClick}
        >
            <IconoirProvider
                iconProps={{
                    style,
                }}
            >
                {icon}
                {children}
            </IconoirProvider>
        </button>
    );
}

export default IconButton;
