import { NavLink } from "react-router";

const Navbar = () => {
    const baseClassName = "text-gray-500 hover:text-gray-900";
    const activeClassName = "text-gray-900";

    return (
        <nav className=" border-b-1 border-gray-200">
            <div className="container mx-auto flex justify-between items-center py-4">
                <NavLink to="/">
                    <div className="text-2xl font-light text-gray-900">
                        Allison Batoff
                    </div>
                    <div className="text-gray-900">
                        Photography & Design
                    </div>
                </NavLink>
                <ul className="flex">
                    <li className="flex justify-center mr-6">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? activeClassName
                                    : baseClassName
                            }
                            to="/">
                            Home
                        </NavLink>
                    </li>
                    <li className="flex justify-center mr-6">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? activeClassName
                                    : baseClassName
                            }
                            to="/photography">
                            Photography
                        </NavLink>
                    </li>
                    <li className="flex justify-center mr-6">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? activeClassName
                                    : baseClassName
                            }
                            to="/design">
                            Design
                        </NavLink>
                    </li>
                    <li className="flex justify-center">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? activeClassName
                                    : baseClassName
                            }
                            to="/contact">
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
