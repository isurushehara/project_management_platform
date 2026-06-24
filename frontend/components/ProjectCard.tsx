import Link from "next/link";

interface Props {
    project: {
        id: number;
        name: string;
        description?: string;
        createdAt?: string;
    };
}

export default function ProjectCard({
    project,
}: Props) {
    return (
        <Link
            href={`/projects/${project.id}`}
            className="
                bg-white
                rounded-2xl
                p-6
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                border
                border-slate-200
                group
            "
        >
            <div className="flex items-center justify-between">

                <div className="
                    w-12 h-12
                    rounded-xl
                    bg-blue-100
                    flex items-center justify-center
                    text-xl
                ">
                    🚀
                </div>

                <span className="
                    text-xs
                    px-3 py-1
                    rounded-full
                    bg-blue-50
                    text-blue-600
                ">
                    Active
                </span>

            </div>

            <h2 className="
                text-xl
                font-bold
                text-slate-800
                mt-5
                group-hover:text-blue-600
            ">
                {project.name}
            </h2>

            <p className="
                text-slate-500
                mt-2
                line-clamp-2
            ">
                {project.description || "No description provided"}
            </p>

            <div className="
                mt-6
                pt-4
                border-t
                text-sm
                text-slate-400
            ">
                Open Project →
            </div>
        </Link>
    );
}