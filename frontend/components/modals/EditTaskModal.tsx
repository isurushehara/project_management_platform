"use client";

import { useState } from "react";

interface Props {

    task: any;

    onClose: () => void;

    onSave: (task: any) => void;
}

export default function EditTaskModal({
    task,
    onClose,
    onSave,
}: Props) {

    const [title, setTitle] =
        useState(task.title);

    const [description, setDescription] =
        useState(task.description);

    const [status, setStatus] =
        useState(task.status);

    const [dueDate, setDueDate] =
        useState(
            task.dueDate?.split("T")[0] || ""
        );

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl p-6 w-full max-w-md">

                <h2 className="text-2xl font-bold mb-5">
                    Edit Task
                </h2>

                <input
                    className="border rounded-xl p-3 w-full mb-3"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    className="border rounded-xl p-3 w-full mb-3"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <select
                    className="border rounded-xl p-3 w-full mb-3"
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>

                <input
                    type="date"
                    className="border rounded-xl p-3 w-full mb-5"
                    value={dueDate}
                    onChange={(e) =>
                        setDueDate(e.target.value)
                    }
                />

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="border px-4 py-2 rounded-xl"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() =>
                            onSave({
                                ...task,
                                title,
                                description,
                                status,
                                dueDate,
                            })
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                    >
                        Save
                    </button>

                </div>

            </div>

        </div>

    );
}