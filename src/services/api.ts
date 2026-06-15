// const API_URL = process.env.VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export async function apiRequest<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const token = localStorage.getItem("token")

    const res = await fetch(API_URL + url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    })

    if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token")
        window.location.href = "/login"
        throw new Error("Unauthorized")
    }

    return res.json()
}