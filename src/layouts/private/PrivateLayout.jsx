import { Outlet } from "react-router";

export function PrivateLayout () {
    return (
        <>
            <h1>Private Layout</h1>
            <Outlet />
        </>
    )
}