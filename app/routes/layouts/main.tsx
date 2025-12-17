import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { disableImageInteractions } from "~/utils/disableImageInteractions";

function MainLayout() {
    const location = useLocation();

    useEffect(() => {
        disableImageInteractions();
    }, [location.pathname]);

    return (
        <>
            <section className="container mx-auto mb-12 px-4">
                <Outlet />
            </section>
        </>
    );
}

export default MainLayout;
