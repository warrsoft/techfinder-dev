import { Navigate, Outlet } from "react-router"
import { useAuth } from "../auth/auth"
import { PUBLIC_ROUTES } from "../constants/routes.js"


const PrivateRoute = () => {

    const { user, loading } = useAuth()


    if(loading) return <div>Loading...</div>

    return user ? <Outlet /> : <Navigate to={PUBLIC_ROUTES.LOGIN} />

};

export default PrivateRoute