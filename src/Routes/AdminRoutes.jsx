import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";
import Spinner from '../admin/Spinner';

export default function AdminRoutes() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        // Check if the user is authenticated and is an admin
        if (auth?.user && auth.user.userType === "admin") {
            setOk(true);
        } else {
            setOk(false);
        }
    }, [auth]);

    return ok ? <Outlet /> : <Spinner />;
}
