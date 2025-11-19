const Footer = () => {
    return (
        <nav className="sticky top-[100vh] container mx-auto flex justify-center p-4 text-gray-500">
            &copy; Allison Batoff {new Date().getFullYear()}
        </nav>
    );
};

export default Footer;
