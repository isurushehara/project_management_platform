"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {

    const router = useRouter();

    const {
        isLoggedIn,
        logout,
    } = useAuth();

    const handleLogout = () => {

        logout();

        toast.success("Logged out successfully");

        router.push("/login");
    };

    return (
        <header
            className="
                bg-white
                border-b
                px-8
                py-4
                flex
                justify-between
                items-center
            "
        >

            <div>

                <h2
                    className="
                        font-semibold
                        text-slate-800
                        text-lg
                    "
                >
                    TaskFlow
                </h2>

            </div>

            <div
                className="
                    flex
                    items-center
                    gap-4
                "
            >

                {isLoggedIn ? (

                    <>
                        <span
                            className="
                                text-sm
                                text-slate-500
                            "
                        >
                            Welcome Back
                        </span>

                        <div
                            className="
                                w-10
                                h-10
                                rounded-full
                                bg-blue-600
                                flex
                                items-center
                                justify-center
                                text-white
                                font-bold
                            "
                        >
                            I
                        </div>

                        <button
                            onClick={handleLogout}
                            className="
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                transition
                            "
                        >
                            Logout
                        </button>
                    </>

                ) : (

                    <Link
                        href="/login"
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            transition
                        "
                    >
                        Login
                    </Link>

                )}

            </div>

        </header>
    );
}