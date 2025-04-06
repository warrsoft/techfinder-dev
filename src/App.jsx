import { Route, Routes } from "react-router"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./constants/routes"
import { WelcomePage } from "./pages/WelcomePage.jsx"
import { LoginPage } from "./pages/LoginPage.jsx"
import { SignupPage } from "./pages/SignupPage.jsx"
import { DashboardPage } from "./pages/private/DashboardPage.jsx"
import { ProfilePage } from "./pages/private/ProfilePage.jsx"
import PrivateRoute from "./guards/auth.guard.jsx"
import { PublicLayout } from "./layouts/PublicLayout.jsx"
import { PrivateLayout } from "./layouts/private/PrivateLayout.jsx"
import { NavBarProvider } from "./contexts/NavBarContext.jsx"
import { RequestsPage } from "./pages/private/MyRequestsPage.jsx"
import { WorkPage } from "./pages/private/WorkPage.jsx"
import { TechFilterProvider } from "./contexts/TechFilterContext.jsx"

function App() {

  return (
    <>
      <Routes>
          <Route element={<NavBarProvider><PublicLayout /></NavBarProvider>}>
            <Route path={PUBLIC_ROUTES.HOME.PATH} element={<WelcomePage />}/>
            <Route path={PUBLIC_ROUTES.LOGIN.PATH} element={<LoginPage />}/>
            <Route path={PUBLIC_ROUTES.SIGNUP.PATH} element={<SignupPage />}/>
          </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
              <Route path={PRIVATE_ROUTES.DASHBOARD.PATH} element={<TechFilterProvider><DashboardPage /></TechFilterProvider>}/>
              <Route path={PRIVATE_ROUTES.REQUESTS.PATH} element={<RequestsPage />}/>
              <Route path={PRIVATE_ROUTES.PROFILE.PATH} element={<ProfilePage />}/>
              <Route path={PRIVATE_ROUTES.TECHNICIANS.PATH} element={<WorkPage />}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
