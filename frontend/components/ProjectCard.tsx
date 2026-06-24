import Link from "next/link";

export default function ProjectCard({
    project,
}: any) {

    return (
        <Link
            href={`/projects/${project.id}`}
            className="block bg-white p-5 rounded-lg shadow"
        >
            <h2 className="font-bold text-lg">
                {project.name}
            </h2>

            <p className="text-gray-500 mt-2">
                {project.description}
            </p>
        </Link>
    );
}