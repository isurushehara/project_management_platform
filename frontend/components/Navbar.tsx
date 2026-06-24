"use client";

export default function Navbar() {

    return (
        <header className="
            bg-white
            border-b
            px-8
            py-4
            flex
            justify-between
            items-center
        ">

            <div>

                <h2 className="
                    font-semibold
                    text-slate-800
                    text-lg
                ">
                    TaskFlow
                </h2>

            </div>

            <div className="
                flex
                items-center
                gap-4
            ">

                <div className="
                    text-sm
                    text-slate-500
                ">
                    Welcome Back
                </div>

                <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-blue-600
                    flex
                    items-center
                    justify-center
                    text-white
                    font-bold
                ">
                    I
                </div>

            </div>

        </header>
    );
}