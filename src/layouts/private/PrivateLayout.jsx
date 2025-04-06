import { Outlet } from "react-router";
import { SideBar } from "../../components/private/SideBar";

export function PrivateLayout () {
    return (
        <div className="flex h-dvh p-4 gap-4">
            <SideBar />
            <Outlet />
        </div>
    )
}