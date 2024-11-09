import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
//import axios from "axios";
import { useAuth } from "../context/auth";
import Spinner from '../admin/Spinner';

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        // Check if the user is authenticated and is an customer
        if (auth?.user && auth.user.userType === "customer") {
            setOk(true);
        } else {
            setOk(false);
        }
    }, [auth]);

    return ok ? <Outlet /> : <Spinner />;
}