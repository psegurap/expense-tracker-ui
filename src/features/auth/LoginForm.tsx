import { apiRequest } from "../../services/api";
import type { AuthResponseType } from "../../../types";
import { useAuthStore } from "./authStore";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

export default function LoginForm() {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState<{ email: string; password: string }>({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    function handleInputChange(type: "email" | "password", value: string) {
        if (type == "email") {
            setInputs({
                email: value,
                password: inputs.password,
            });
        } else if (type == "password") {
            setInputs({
                email: inputs.email,
                password: value,
            });
        }
    }

    async function handleLogin(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        let errors = [];
        if (inputs.email.trim() === "") {
            errors.push("The email address is required.");
        }

        if (inputs.password.trim() === "") {
            errors.push("The password is required.");
        }

        if (errors.length == 0) {
            const data = await apiRequest<AuthResponseType>("/login", {
                method: "POST",
                body: JSON.stringify({
                    email: inputs.email,
                    password: inputs.password,
                }),
            });

            switch (data.status) {
                case 200:
                    login(data.token);
                    navigate("/dashboard");
                    break;
                case 400:
                    if (data.message) {
                        setErrorMessage([data.message]);
                    }
                    break;
                default:
                    setErrorMessage([
                        "There was an error validating this request.",
                    ]);
                    break;
            }
        } else {
            setErrorMessage(errors);
        }
    }

    return (
        <form onSubmit={(event) => handleLogin(event)} className="space-y-6">
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                >
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={inputs.email}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => handleInputChange("email", event.target.value)}
                        // required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                >
                    Password
                </label>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={inputs.password}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => handleInputChange("password", event.target.value)}
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6"
                    />
                </div>
            </div>

            {errorMessage.length > 0 && (
                <ul className="list-disc list-inside mb-2 text-red-500 -mt-2 ml-2">
                    {errorMessage.map((message, msgInd) => (
                        <li key={msgInd} className="text-sm">
                            {message}
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex items-center justify-between">
                <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                disabled
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-cyan-600 checked:bg-cyan-600 indeterminate:border-cyan-600 indeterminate:bg-cyan-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100forced-colors:appearance-auto"
                            />
                            <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            >
                                <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                />
                                <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                />
                            </svg>
                        </div>
                    </div>
                    <label
                        htmlFor="remember-me"
                        className="block text-sm/6 text-gray-900"
                    >
                        Remember me
                    </label>
                </div>
                <div className="text-sm/6">
                    <Link
                        to="/register"
                        className="font-semibold text-cyan-600 hover:text-cyan-500"
                    >
                        Need an account?
                    </Link>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                >
                    Sign in
                </button>
            </div>
        </form>
    );
}
