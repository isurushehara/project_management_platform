"use client";

import { useState } from "react";
import { login } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loginUser } = useAuth();

    const router = useRouter();

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            const response =
                await login({
                    email,
                    password,
                });

            loginUser(response.token);

            router.push("/dashboard");

        } catch {

            alert("Login Failed");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-20"
        >
            <input
                className="border p-2 w-full"
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
                className="bg-blue-600 text-white px-4 py-2 mt-3"
            >
                Login
            </button>
        </form>
    );
}