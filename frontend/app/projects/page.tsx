"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/services/projectService";
import ProjectCard from "@/components/ProjectCard";

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

    if (projects.length === 0) {
        return (
            <div className="text-center mt-10">

                No Projects Yet

            </div>
        );
    }

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold mb-5">
                My Projects
            </h1>

            <div className="grid grid-cols-3 gap-5">

                {projects.map(project => (

                    <ProjectCard
                        key={project.id}
                        project={project}
                    />

                ))}

            </div>

        </div>
    );
}