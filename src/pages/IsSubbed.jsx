import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const IsSubbed = () => {
    const { auth } = useAuth();
    return (
        auth?.plan === "pro"
            ? <Navigate to="/storefront" replace/>
            : <Outlet/>
    );
}

export default IsSubbed;