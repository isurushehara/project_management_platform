"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/services/projectService";

export default function ProjectsPage() {

    const [projects, setProjects] =
        useState<any[]>([]);

    useEffect(() => {

        const loadProjects = async () => {

            const data =
                await getProjects();

            setProjects(data);
        };

        loadProjects();

    }, []);

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold mb-5">
                My Projects
            </h1>

            {projects.map(project => (
                <div
                    key={project.id}
                    className="border p-4 mb-3 rounded"
                >
                    <h2 className="font-bold">
                        {project.name}
                    </h2>

                    <p>
                        {project.description}
                    </p>
                </div>
            ))}

        </div>
    );
}