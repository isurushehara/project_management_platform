interface Props {
    task: {
        id: number;
        title: string;
        description?: string;
        status: string;
        dueDate?: string;
    };
}

export default function TaskCard({
    task,
}: Props) {

    const statusStyles = {
        "To Do":
            "bg-slate-100 text-slate-700",

        "In Progress":
            "bg-yellow-100 text-yellow-700",

        "Completed":
            "bg-green-100 text-green-700",
    };

    return (
        <div
            className="
                bg-white
                rounded-2xl
                p-5
                shadow-sm
                hover:shadow-lg
                transition
                border
                border-slate-200
            "
        >

            <div className="
                flex
                justify-between
                items-start
            ">

                <div>

                    <h3 className="
                        text-lg
                        font-semibold
                        text-slate-800
                    ">
                        {task.title}
                    </h3>

                    <p className="
                        text-slate-500
                        mt-2
                    ">
                        {task.description ||
                            "No description"}
                    </p>

                </div>

                <span
                    className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                        ${statusStyles[
                            task.status as keyof typeof statusStyles
                        ] || "bg-slate-100"}
                    `}
                >
                    {task.status}
                </span>

            </div>

            {task.dueDate && (

                <div className="
                    mt-4
                    pt-4
                    border-t
                    text-sm
                    text-slate-400
                ">
                    Due:
                    {" "}
                    {new Date(
                        task.dueDate
                    ).toLocaleDateString()}
                </div>

            )}

        </div>
    );
}