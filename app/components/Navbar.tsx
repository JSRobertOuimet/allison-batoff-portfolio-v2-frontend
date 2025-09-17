import { useState } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const baseClassName = "text-gray-500 hover:text-gray-900";
    const activeClassName = "text-gray-900";

    return (
        <nav className="mb-12 border-b-1 border-gray-200">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <NavLink to="/">
                    <div className="text-2xl font-light text-gray-900">
                        Allison Batoff
                    </div>
                    <div className="text-gray-900">
                        Photography & Design
                    </div>
                </NavLink>
                <ul className="hidden md:flex">
                    <li className="flex justify-center mr-6">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? activeClassName
                                    : baseClassName
                            }
                            to="/">
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
                <div className="md:hidden flex items-center py-4 pl-4">
                    <button
                        className="cursor-pointer text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? (
                            <IoCloseOutline />
                        ) : (
                            <IoMenuOutline />
                        )}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="container mx-auto">
                    <ul className="md:hidden p-4">
                        <li className="py-4">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? activeClassName
                                        : baseClassName
                                }
                                to="/"
                                onClick={() => setMenuOpen(false)}>
                                Photography
                            </NavLink>
                        </li>
                        <li className="py-4">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? activeClassName
                                        : baseClassName
                                }
                                to="/design"
                                onClick={() => setMenuOpen(false)}>
                                Design
                            </NavLink>
                        </li>
                        <li className="py-4">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? activeClassName
                                        : baseClassName
                                }
                                to="/contact"
                                onClick={() => setMenuOpen(false)}>
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
