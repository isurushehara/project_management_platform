"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TaskCard from "@/components/TaskCard";
import CreateTaskModal from "@/components/modals/CreateTaskModal";
import { createTask } from "@/services/taskService";
import EditTaskModal from "@/components/modals/EditTaskModal";
import { updateTask, deleteTask } from "@/services/taskService";
import toast from "react-hot-toast";

import { getTasksByProject }
    from "@/services/taskService";

export default function ProjectDetails() {

    const params = useParams();

    const [showModal,
        setShowModal] =
        useState(false);

    const [editingTask, setEditingTask] =
        useState<any>(null);

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

    const handleStatusChange = async (
        id: number,
        status: string
    ) => {

        const task =
            tasks.find(t => t.id === id);

        if (!task)
            return;

        const updated =
            await updateTask(id, {
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                status,
            });

        setTasks(
            tasks.map(t =>
                t.id === id
                    ? updated
                    : t
            )
        );
    };

    return (
        <div className="flex min-h-screen bg-slate-100">

            <div className="flex-1">

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
                            onClick={() =>
                                setShowModal(true)
                            }
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-5 py-3
                                rounded-xl
                                font-medium
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
                                        onEdit={(task) => setEditingTask(task)}
                                        onDelete={async (id) => {

                                            if (!confirm("Delete this task?"))
                                                return;

                                            await deleteTask(id);

                                            setTasks(tasks.filter(t => t.id !== id));
                                        }}
                                        onStatusChange={handleStatusChange}
                                    />

                                ))}

                            </div>

                        )}

                    {
                        showModal && (

                            <CreateTaskModal

                                projectId={projectId}

                                onClose={() =>
                                    setShowModal(false)
                                }

                                onCreate={async (
                                    title,
                                    description,
                                    dueDate
                                ) => {

                                    const task =
                                        await createTask({
                                            title,
                                            description,
                                            dueDate,
                                            projectId,
                                        });

                                    setTasks([
                                        task,
                                        ...tasks,
                                    ]);

                                    setShowModal(false);
                                }}
                            />

                        )
                    }

                    {editingTask && (

                        <EditTaskModal

                            task={editingTask}

                            onClose={() =>
                                setEditingTask(null)
                            }

                            onSave={async (updatedTask) => {

                                const updated =
                                    await updateTask(
                                        updatedTask.id,
                                        updatedTask
                                    );

                                setTasks(
                                    tasks.map(t =>
                                        t.id === updated.id
                                            ? updated
                                            : t
                                    )
                                );

                                setEditingTask(null);
                            }}

                        />

                    )}

                </main>

            </div>

        </div>
    );
}