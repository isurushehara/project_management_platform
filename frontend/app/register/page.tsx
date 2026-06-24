"use client";

import { useState } from "react";
import Link from "next/link";
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

            router.push("/login");

        } catch {

            alert("Registration Failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                <div className="text-center mb-8">

                    <div className="w-16 h-16 bg-green-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold">
                        T
                    </div>

                    <h1 className="text-3xl font-bold mt-4 text-slate-800">
                        Create Account
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Start managing your projects today
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <input
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-4"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 mb-6"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        className="
                            w-full
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            py-3
                            rounded-xl
                            font-medium
                        "
                    >
                        Create Account
                    </button>

                </form>

                <p className="text-center mt-6 text-slate-500">

                    Already have an account?

                    <Link
                        href="/login"
                        className="text-blue-600 ml-2 font-medium"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}