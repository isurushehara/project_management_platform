"use client";

import { useState } from "react";

interface Props {
    onClose: () => void;
    onCreate: (
        name: string,
        description: string
    ) => void;
}

export default function CreateProjectModal({
    onClose,
    onCreate,
}: Props) {

    const [name, setName] =
        useState("");

    const [description,
        setDescription] =
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
                    mb-4
                ">
                    Create Project
                </h2>

                <input
                    className="
                        border
                        rounded-xl
                        p-3
                        w-full
                        mb-3
                    "
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) =>
                        setName(
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
                        mb-4
                    "
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
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
                                name,
                                description
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