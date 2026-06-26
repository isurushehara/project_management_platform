"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/services/projectService";
import ProjectCard from "@/components/ProjectCard";
import CreateProjectModal from "@/components/modals/CreateProjectModal";
import { createProject } from "@/services/projectService";

export default function ProjectsPage() {

    const [showModal,
        setShowModal] =
        useState(false);

    const [projects, setProjects] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadProjects = async () => {

            try {

                const data =
                    await getProjects();

                setProjects(data);


            } finally {

                setLoading(false);
            }
        };

        loadProjects();

    }, []);

    return (
        <div className="flex min-h-screen bg-slate-100">

            <div className="flex-1">

                <main className="p-8">

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-8
                    ">

                        <div>

                            <h1 className="
                                text-4xl
                                font-bold
                                text-slate-800
                            ">
                                My Projects
                            </h1>

                            <p className="
                                text-slate-500
                                mt-2
                            ">
                                Manage all your projects in one place.
                            </p>

                        </div>

                        <button
                            onClick={() =>
                                setShowModal(true)
                            }
                            className="
                                bg-blue-600
                                text-white
                                px-5 py-3
                                rounded-xl
                            "
                        >
                            + New Project
                        </button>

                    </div>

                    {loading && (

                        <div className="
                            text-slate-500
                            text-lg
                        ">
                            Loading projects...
                        </div>

                    )}

                    {!loading && projects.length === 0 && (

                        <div className="
                            bg-white
                            rounded-2xl
                            p-12
                            text-center
                            shadow-sm
                        ">

                            <div className="text-6xl mb-4">
                                📁
                            </div>

                            <h2 className="
                                text-2xl
                                font-bold
                                text-slate-800
                            ">
                                No Projects Yet
                            </h2>

                            <p className="
                                text-slate-500
                                mt-2
                            ">
                                Create your first project to get started.
                            </p>

                        </div>

                    )}

                    {!loading && projects.length > 0 && (

                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            xl:grid-cols-3
                            gap-6
                        ">

                            {projects.map(project => (

                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                />

                            ))}

                        </div>

                    )}

                    {
                        showModal && (

                            <CreateProjectModal

                                onClose={() =>
                                    setShowModal(false)
                                }

                                onCreate={async (
                                    name,
                                    description
                                ) => {

                                    const project =
                                        await createProject({
                                            name,
                                            description,
                                        });

                                    setProjects([
                                        project,
                                        ...projects,
                                    ]);

                                    setShowModal(false);
                                }}
                            />

                        )
                    }

                </main>

            </div>

        </div>
    );
}