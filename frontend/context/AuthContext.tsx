"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

interface AuthContextType {
    token: string | null;
    loginUser: (token: string) => void;
    logout: () => void;
}

const AuthContext =
    createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [token, setToken] =
        useState<string | null>(null);

    useEffect(() => {
        const storedToken =
            localStorage.getItem("token");

        if (storedToken)
            setToken(storedToken);
    }, []);

    const loginUser = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                loginUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context)
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );

    return context;
}