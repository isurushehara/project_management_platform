"use client";

import { useState } from "react";
import { register } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

    const router = useRouter();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            await register({
                name,
                email,
                password,
            });

            alert("Registration Successful");

            router.push("/login");

        } catch {

            alert("Registration Failed");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-20"
        >
            <input
                className="border p-2 w-full"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <input
                className="border p-2 w-full mt-3"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                className="border p-2 w-full mt-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button
                className="bg-green-600 text-white px-4 py-2 mt-3"
            >
                Register
            </button>
        </form>
    );
}