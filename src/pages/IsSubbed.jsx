import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const IsSubbed = () => {
    const { auth } = useAuth();
    console.log(auth);
    return (
        auth?.plan === "pro"
            ? <Navigate to="/storefront" replace/>
            : <Outlet/>
    );
}

export default IsSubbed;