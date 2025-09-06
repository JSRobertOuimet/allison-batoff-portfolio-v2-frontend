import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <>
            <section className="container mx-auto px-4 mb-12">
                <Outlet />
            </section>
        </>
    );
};

export default MainLayout;
