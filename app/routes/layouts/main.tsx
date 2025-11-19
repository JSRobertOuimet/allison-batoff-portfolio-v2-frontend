import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <>
            <section className="container mx-auto mb-12 px-4">
                <Outlet />
            </section>
        </>
    );
};

export default MainLayout;
