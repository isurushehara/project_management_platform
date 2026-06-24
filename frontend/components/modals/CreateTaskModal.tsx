"use client";

import { useState } from "react";

interface Props {
    projectId: number;
    onClose: () => void;
    onCreate: (
        title: string,
        description: string,
        dueDate: string
    ) => void;
}

export default function CreateTaskModal({
    projectId,
    onClose,
    onCreate,
}: Props) {

    const [title, setTitle] =
        useState("");

    const [description,
        setDescription] =
        useState("");

    const [dueDate,
        setDueDate] =
        useState("");

    return (
        <div className="
            fixed inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
        ">

            <div className="
                bg-white
                rounded-2xl
                p-6
                w-full
                max-w-md
            ">

                <h2 className="
                    text-2xl
                    font-bold
                    mb-5
                ">
                    Create Task
                </h2>

                <input
                    className="
                        border
                        rounded-xl
                        p-3
                        w-full
                        mb-3
                    "
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                />

                <textarea
                    className="
                        border
                        rounded-xl
                        p-3
                        w-full
                        mb-3
                    "
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />

                <input
                    type="date"
                    className="
                        border
                        rounded-xl
                        p-3
                        w-full
                        mb-5
                    "
                    value={dueDate}
                    onChange={(e) =>
                        setDueDate(
                            e.target.value
                        )
                    }
                />

                <div className="
                    flex
                    justify-end
                    gap-3
                ">

                    <button
                        onClick={onClose}
                        className="
                            px-4 py-2
                            border
                            rounded-xl
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() =>
                            onCreate(
                                title,
                                description,
                                dueDate
                            )
                        }
                        className="
                            px-4 py-2
                            bg-blue-600
                            text-white
                            rounded-xl
                        "
                    >
                        Create
                    </button>

                </div>

            </div>

        </div>
    );
}