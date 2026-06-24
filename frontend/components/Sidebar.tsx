"use client";

import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">

            <h1 className="text-2xl font-bold mb-8">
                TaskFlow
            </h1>

            <nav className="space-y-3">

                <Link
                    href="/dashboard"
                    className="block hover:text-blue-400"
                >
                    Dashboard
                </Link>

                <Link
                    href="/projects"
                    className="block hover:text-blue-400"
                >
                    Projects
                </Link>

            </nav>

        </aside>
    );
}