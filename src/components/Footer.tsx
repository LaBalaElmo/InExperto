import Logo from "../assets/images/logo_inexoert.png";
import { Link } from "react-router-dom";
import Social from "./texts/Social";
import { footerLinks, footerInfo } from "../data/footer";
import Info from "./texts/Info";

function Footer() {
    return (
        <footer className="bg-blue-950 relative bottom-0">
            <div className="lg:grid lg:grid-cols-2 flex flex-col gap-4 lg:px-24 px-6 py-12">
                <section className="flex flex-col gap-4">
                    <div className="flex text-white items-center font-bold font-sans text-lg">
                        <img src={Logo} alt="Logo" className="h-10" />
                        InExperto
                    </div>
                    <div className="flex gap-x-2">
                        <Social />
                    </div>
                </section>
                <section className="lg:grid flex flex-col  gap-6 lg:grid-cols-2">
                    <span className="text-white flex flex-col gap-2">
                        <h3 className="text-xl">Explore</h3>
                        <ul className="list-image-dots list-inside">
                            {footerLinks.map((link) => (
                                <li key={link.id}>
                                    <Link
                                        className="ml-2 hover:underline"
                                        to={link.to}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </span>
                    <span className="text-white flex flex-col gap-2">
                        <h3 className="text-xl">Sigue en contacto</h3>
                        <section>
                            <Info info={footerInfo} />
                        </section>
                    </span>
                </section>
            </div>
            <section className="p-4  grid items-center">
                <p className="text-gray-400 text-center before:bg-gray-400 overline-text">
                    © 2023 InExperto.
                </p>
            </section>
        </footer>
    );
}

export default Footer;
