import { Navigate, Outlet } from "react-router"
import { useAuth } from "../auth/auth"
import { PUBLIC_ROUTES } from "../constants/routes.js"
import { Loading } from "../components/Loading.jsx";


const PrivateRoute = () => {
  const { session, loading } = useAuth();

  if (loading) return <Loading />;
  if (!session) return <Navigate to={PUBLIC_ROUTES.LOGIN.PATH} />;
  
  return <Outlet />;
};

export default PrivateRoute