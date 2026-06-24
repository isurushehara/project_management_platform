"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardService";
import DashboardCard from "@/components/DashboardCard";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const loadStats = async () => {
            const data = await getDashboardStats();
            setStats(data);
        };

        loadStats();
    }, []);

    if (!stats) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="text-lg font-medium text-slate-600">
                    Loading dashboard...
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="flex-1 p-8">

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold text-slate-800">
                            Dashboard
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Welcome back. Here's an overview of your workspace.
                        </p>

                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white mb-8 shadow-lg">

                        <h2 className="text-2xl font-bold">
                            TaskFlow Workspace
                        </h2>

                        <p className="mt-2 text-blue-100">
                            Manage projects, track tasks, and stay productive.
                        </p>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        <DashboardCard
                            title="Projects"
                            value={stats.totalProjects}
                            color="blue"
                        />

                        <DashboardCard
                            title="Tasks"
                            value={stats.totalTasks}
                            color="purple"
                        />

                        <DashboardCard
                            title="Completed"
                            value={stats.completedTasks}
                            color="green"
                        />

                        <DashboardCard
                            title="Pending"
                            value={stats.pendingTasks}
                            color="orange"
                        />

                    </div>

                </main>

            </div>

        </div >
    );
}