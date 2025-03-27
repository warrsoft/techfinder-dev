import { Navigate } from "react-router"
import { useAuth } from "../auth/auth"
import { PUBLIC_ROUTES } from "../constants/routes.js"


const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to={PUBLIC_ROUTES.LOGIN}/>
    };

    return children
};

export default PrivateRoute