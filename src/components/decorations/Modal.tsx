import { Cancel } from "iconoir-react";
import { motion } from "framer-motion";
import { Dispatch } from "react";
import IconButton from "../buttons/IconButton";

type ModalProps = {
    children: React.ReactNode;
    setModal: Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ children, setModal }: ModalProps) {
    const animation = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
        },
    };
    return (
        <motion.div
            variants={animation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed w-full h-full top-0 bg-black-transparent  grid right-0 place-items-center p-2 z-40"
            onClick={() => setModal(false)}
        >
            <span className="absolute top-4 right-4 text-white">
                <IconButton
                    icon={<Cancel />}
                    style={{ width: "2.25rem", height: "2.25rem" }}
                    onClick={() => setModal(false)}
                />
            </span>
            {children}
        </motion.div>
    );
}

export default Modal;
