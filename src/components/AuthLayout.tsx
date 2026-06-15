import type { ReactElement } from "react";
import { useAuthStore } from "../features/auth/authStore";
import { Navigate, useLocation } from "react-router";

export default function AuthLayout({
    title,
    children,
}: {
    title: string;
    children: ReactElement;
}) {
    const location = useLocation();
    const token = useAuthStore((state) => state.token);

    const from = location.state?.from.pathname || "/dashboard";

    if (token) return <Navigate to={from} />;

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 l bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=cyan&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                
                <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    {title}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] px-5">
                <div className="bg-white px-6 py-12 shadow-sm rounded-sm sm:rounded-lg sm:px-12">
                    {children}
                </div>
            </div>
        </div>
    );
}
