"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

    const pathname = usePathname();

    const navItem = (href: string) =>
        `block px-4 py-3 rounded-xl transition ${pathname === href
            ? "bg-blue-600 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <aside className="w-72 bg-slate-950 min-h-screen p-6 border-r border-slate-800">

            <div className="mb-10">

                <h1 className="text-3xl font-bold text-white">
                    TaskFlow
                </h1>

                <p className="text-slate-400 text-sm mt-1">
                    Project Management System
                </p>

            </div>

            <nav className="space-y-2">

                <Link
                    href="/dashboard"
                    className={navItem("/dashboard")}
                >
                    Dashboard
                </Link>

                <Link
                    href="/projects"
                    className={navItem("/projects")}
                >
                    Projects
                </Link>

            </nav>

        </aside>
    );
}