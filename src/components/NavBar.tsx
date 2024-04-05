import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo_inexoert.png";
import SocialButton from "./buttons/SocialButton";
import UseAnimations from "react-useanimations";
import facebook from "react-useanimations/lib/facebook";
import twitter from "react-useanimations/lib/twitter";
import linkedin from "react-useanimations/lib/linkedin";

export default function Navbar() {
    const navLinkClass =
        "text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium";
    const activeClass =
        "bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium";
    const pendingClass =
        "bg-gray-500 text-white px-3 py-2 rounded-md text-sm font-medium";
    return (
        <nav className="bg-blue-950 px-8 py-4 flex justify-between align-middle items-center">
            <div className="grid grid-cols-4 items-center gap-2">
                <div className="flex text-white items-center font-bold font-sans text-lg">
                    <img src={logo} alt="Logo" className="h-10" />
                    InExperto
                </div>
                <div className="flex justify-center gap-x-2">
                    <SocialButton onClick={() => {}}>
                        <UseAnimations
                            animation={facebook}
                            strokeColor="var(--color-primary)"
                        />
                    </SocialButton>
                    <SocialButton onClick={() => {}}>
                        <UseAnimations
                            animation={twitter}
                            strokeColor="var(--color-primary)"
                        />
                    </SocialButton>
                    <SocialButton onClick={() => {}}>
                        <UseAnimations
                            animation={linkedin}
                            strokeColor="var(--color-primary)"
                        />
                    </SocialButton>
                </div>
            </div>
            <ul className="flex justify-end">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive, isPending }) =>
                            isPending
                                ? pendingClass
                                : isActive
                                ? activeClass
                                : navLinkClass
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/register"
                        className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Join
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/login"
                        className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                    >
                        Login
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
