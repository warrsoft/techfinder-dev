import { Outlet } from "react-router";
import { TopBar } from "../components/TopBar";
import { useNavBar } from "../contexts/NavBarContext.jsx";

export function PublicLayout () {

    const { overlay, handleMenuBtn } = useNavBar()

    return (
            <div className="relative w-dvw min-h-dvh">
                <TopBar />
                <main className="flex items-center justify-center pt-30 px-4">
                    <Outlet />
                </main>
                <div onClick={handleMenuBtn} className={"absolute inset-0 bg-black opacity-30 z-10" + " " + overlay} />
            </div>
    )
}