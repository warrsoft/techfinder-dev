import { Route, Routes } from "react-router"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./constants/routes"
import { WelcomePage } from "./pages/WelcomePage.jsx"
import { LoginPage } from "./pages/LoginPage.jsx"
import { SignupPage } from "./pages/SignupPage.jsx"
import { DashboardPage } from "./pages/private/DashboardPage.jsx"
import PrivateRoute from "./guards/auth.guard.jsx"
import { PublicLayout } from "./layouts/PublicLayout.jsx"
import { PrivateLayout } from "./layouts/private/PrivateLayout.jsx"
import { NavBarProvider } from "./contexts/NavBarContext.jsx"

function App() {

  return (
    <>
      <Routes>
          <Route element={<NavBarProvider><PublicLayout /></NavBarProvider>}>
            <Route path={PUBLIC_ROUTES.WELCOME} element={<WelcomePage />}/>
            <Route path={PUBLIC_ROUTES.LOGIN} element={<LoginPage />}/>
            <Route path={PUBLIC_ROUTES.SIGNUP} element={<SignupPage />}/>
          </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route path={PRIVATE_ROUTES.DASHBOARD} element={<DashboardPage />}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
