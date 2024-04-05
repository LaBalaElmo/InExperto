import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Layout() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
