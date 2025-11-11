import { NextResponse } from "next/server";

export async function POST(req: Request) {
    console.log(`${process.env.API_URL}`)

    const { email, password } = await req.json();

    const res = await fetch(`${process.env.API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const data = await res.json();

    const response = NextResponse.json({ success: true });

    // ✅ Set HttpOnly cookie
    response.cookies.set("accessToken", data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 30, // 30 phút
    });

    response.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 ngày
    });

    return response;
}
