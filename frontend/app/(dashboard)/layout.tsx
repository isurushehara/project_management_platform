"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const router = useRouter();

    const { token } = useAuth();

    useEffect(() => {

        if (!token) {
            router.replace("/login");
        }

    }, [token, router]);

    if (!token) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}