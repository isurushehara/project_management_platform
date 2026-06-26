"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

            toast.success("Login successful!");

            router.push("/dashboard");

        } catch {

            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                <div className="text-center mb-8">

                    <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold">
                        T
                    </div>

                    <h1 className="text-3xl font-bold mt-4 text-slate-800">
                        Welcome Back
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Sign in to continue using TaskFlow
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <input
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-xl
                            px-4
                            py-3
                            mb-4
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-xl
                            px-4
                            py-3
                            mb-6
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        className="
                            w-full
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-3
                            rounded-xl
                            font-medium
                            transition
                        "
                    >
                        Sign In
                    </button>

                </form>

                <p className="text-center mt-6 text-slate-500">

                    Don't have an account?

                    <Link
                        href="/register"
                        className="text-blue-600 ml-2 font-medium"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}