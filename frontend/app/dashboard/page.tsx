"use client";

import { useEffect, useState } from "react";
import { getDashboardStats }
from "@/services/dashboardService";

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

    if (!stats)
        return <p>Loading...</p>;

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold mb-5">
                Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-4">

                <div className="border p-5 rounded">
                    Projects:
                    {stats.totalProjects}
                </div>

                <div className="border p-5 rounded">
                    Tasks:
                    {stats.totalTasks}
                </div>

                <div className="border p-5 rounded">
                    Completed:
                    {stats.completedTasks}
                </div>

                <div className="border p-5 rounded">
                    Pending:
                    {stats.pendingTasks}
                </div>

            </div>

        </div>
    );
}