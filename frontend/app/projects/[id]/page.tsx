"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";

import { getTasksByProject }
    from "@/services/taskService";

export default function ProjectDetails() {

    const params = useParams();

    const projectId =
        Number(params.id);

    const [tasks, setTasks] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadTasks = async () => {

            try {

                const data =
                    await getTasksByProject(
                        projectId
                    );

                setTasks(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);
            }
        };

        if (projectId) {
            loadTasks();
        }

    }, [projectId]);

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="p-8">

                    <div className="
                        flex
                        justify-between
                        items-center
                        mb-8
                    ">

                        <div>

                            <h1 className="
                                text-4xl
                                font-bold
                                text-slate-800
                            ">
                                Project Tasks
                            </h1>

                            <p className="
                                text-slate-500
                                mt-2
                            ">
                                Manage and track project tasks.
                            </p>

                        </div>

                        <button
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-5
                                py-3
                                rounded-xl
                                font-medium
                                transition
                            "
                        >
                            + New Task
                        </button>

                    </div>

                    {loading && (

                        <div className="
                            text-slate-500
                            text-lg
                        ">
                            Loading tasks...
                        </div>

                    )}

                    {!loading &&
                        tasks.length === 0 && (

                            <div className="
                            bg-white
                            rounded-2xl
                            p-12
                            text-center
                            shadow-sm
                        ">

                                <div className="text-6xl mb-4">
                                    ✅
                                </div>

                                <h2 className="
                                text-2xl
                                font-bold
                                text-slate-800
                            ">
                                    No Tasks Yet
                                </h2>

                                <p className="
                                text-slate-500
                                mt-2
                            ">
                                    Create your first task.
                                </p>

                            </div>

                        )}

                    {!loading &&
                        tasks.length > 0 && (

                            <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            xl:grid-cols-3
                            gap-6
                        ">

                                {tasks.map(task => (

                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                    />

                                ))}

                            </div>

                        )}

                </main>

            </div>

        </div>
    );
}