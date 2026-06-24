"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {

    const {
        token,
        logout
    } = useAuth();

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <p>
                Logged In:
                {token ? " Yes" : " No"}
            </p>

            <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 mt-5"
            >
                Logout
            </button>

        </div>
    );
}