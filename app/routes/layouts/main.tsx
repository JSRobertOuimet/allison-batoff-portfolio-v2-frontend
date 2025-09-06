import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <>
            <section className="container mx-auto">
                <Outlet />
            </section>
        </>
    );
};

export default MainLayout;
