import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import UserChatIcon from "@/assets/icons/UserChatIcon.svg";
import UserCartIcon from "@/assets/icons/UserCartIcon.svg";
import SearchIcon from "@/assets/icons/SearchIcon.svg";
import HeartIcon from "@/assets/icons/HeartIcon.svg";
import Logo from "@/assets/icons/Logo.svg";

export default function UserAuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [cartNumber, setCartNumber] = useState(0);

    const countCartItems = async () => {
        try {
            const response = await fetch("/cart-count", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCartNumber(data.count);
            } else {
                console.error(
                    "Failed to fetch cart count:",
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Failed to fetch cart count:", error);
        }
    };

    useEffect(() => {
        countCartItems();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <nav className="  shadow drop-shadow-md border-b bg-white border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="shrink-0 flex items-center">
                            <Link href="/" className=" flex items-center gap-1">
                                <img className=" h-12" src={Logo} alt="Logo" />
                                <h1>MADEBYHANDS</h1>
                            </Link>
                        </div>

                        <div className="hidden uppercase space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                href={route("shop")}
                                active={route().current("shop")}
                            >
                                Shop
                            </NavLink>
                            <NavLink
                                href={route("about")}
                                active={route().current("about")}
                            >
                                About
                            </NavLink>
                            <NavLink
                                href={route("blog")}
                                active={route().current("blog")}
                            >
                                Blog
                            </NavLink>
                            <NavLink
                                href={route("contact")}
                                active={route().current("contact")}
                            >
                                Contact
                            </NavLink>
                        </div>

                        <div className=" gap-3 flex sm:items-center sm:ms-6">
                            <img
                                className=" h-6 "
                                src={SearchIcon}
                                alt="search icon"
                            />
                            <img
                                className=" h-6 "
                                src={HeartIcon}
                                alt="heart icon"
                            />
                            <NavLink href={route("user-messages")}>
                                <img
                                    className=" h-6 "
                                    src={UserChatIcon}
                                    alt="chat icon"
                                />
                            </NavLink>
                            <NavLink href={route("user-cart")}>
                                <div className=" relative">
                                    <span className=" absolute -top-2 -right-2 text-sm font-bold">
                                        {cartNumber == 0 ? "" : cartNumber}
                                    </span>
                                    <img
                                        className=" h-6 "
                                        src={UserCartIcon}
                                        alt="cart icon"
                                    />
                                </div>
                            </NavLink>
                            <div className=" relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.fname}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}