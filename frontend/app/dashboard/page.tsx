"use client";

import { useEffect, useState } from "react";
import { getDashboardStats }
    from "@/services/dashboardService";
import DashboardCard from "@/components/DashboardCard";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {

    const [stats, setStats] =
        useState<any>(null);

    useEffect(() => {

        const loadStats = async () => {

            const data =
                await getDashboardStats();

            setStats(data);
        };

        loadStats();

    }, []);

    if (!stats) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex">

            <Sidebar />

            <main className="flex-1 p-10">

                <h1 className="text-4xl font-bold mb-6">
                    Dashboard
                </h1>

                <div className="grid grid-cols-4 gap-5">

                    <DashboardCard
                        title="Projects"
                        value={stats.totalProjects}
                    />

                    <DashboardCard
                        title="Tasks"
                        value={stats.totalTasks}
                    />

                    <DashboardCard
                        title="Completed"
                        value={stats.completedTasks}
                    />

                    <DashboardCard
                        title="Pending"
                        value={stats.pendingTasks}
                    />

                </div>

            </main>

        </div>
    );
}