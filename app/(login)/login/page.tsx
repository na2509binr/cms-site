"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            setError("Sai email hoặc mật khẩu");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm p-6 border rounded-lg shadow">
                <h1 className="text-xl mb-4">Admin Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded mb-3"
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded mt-3"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Đang xử lý..." : "Đăng nhập"}
                </button>
            </div>
        </div>
    );
}
