const Footer = () => {
    return (
        <nav className="sticky top-[100vh] container mx-auto p-4 flex justify-center text-gray-500">
            &copy; Allison Batoff {new Date().getFullYear()}
        </nav>
    );
};

export default Footer;
