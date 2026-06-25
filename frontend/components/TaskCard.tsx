interface Props {
    task: any;
    onEdit: (task: any) => void;
    onDelete: (id: number) => void;
    onStatusChange: (
        id: number,
        status: string
    ) => void;
}

export default function TaskCard({
    task,
    onEdit,
    onDelete,
    onStatusChange,
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

                <select
                    value={task.status}
                    onChange={(e) =>
                        onStatusChange(
                            task.id,
                            e.target.value
                        )
                    }
                    className={`
        px-3
        py-2
        rounded-lg
        text-sm
        font-medium
        border
        outline-none
        cursor-pointer
        ${task.status === "Completed"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : task.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                : "bg-slate-100 text-slate-700 border-slate-300"
                        }
    `}
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

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

            <div className="flex justify-end gap-4 mt-5">

                <button
                    onClick={() => onEdit(task)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    ✏ Edit
                </button>

                <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                >
                    🗑 Delete
                </button>

            </div>

        </div>
    );
}