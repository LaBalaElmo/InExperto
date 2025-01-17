import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.userId ? (
        <Outlet />
    ) : (
        // <Outlet />
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
};

export default RequireAuth;
