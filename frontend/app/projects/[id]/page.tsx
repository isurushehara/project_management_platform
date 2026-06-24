"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTasksByProject } from "@/services/taskService";

export default function ProjectDetails() {

    const params = useParams();

    const projectId = Number(params.id);

    const [tasks, setTasks] = useState<any[]>([]);

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
            }
        };

        if (projectId) {
            loadTasks();
        }

    }, [projectId]);

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold mb-5">
                Tasks
            </h1>

            {tasks.map(task => (
                <div
                    key={task.id}
                    className="border p-4 mb-3 rounded"
                >
                    <h2>{task.title}</h2>

                    <p>{task.status}</p>
                </div>
            ))}

        </div>
    );
}