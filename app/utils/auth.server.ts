import { redirect } from "react-router";
import { config } from "../config/environment";

export async function requireAuth(request: Request): Promise<void> {
    try {
        const res = await fetch(`${config.API_URL}/verify`, {
            headers: {
                Cookie: request.headers.get("cookie") ?? "",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "include",
        });

        if (!res.ok) {
            const url = new URL(request.url);
            throw redirect(`/login?redirectTo=${url.pathname}`);
        }

        const data = await res.json();
        if (!data.authorized) {
            const url = new URL(request.url);
            throw redirect(`/login?redirectTo=${url.pathname}`);
        }
    } catch (error) {
        const url = new URL(request.url);
        throw redirect(`/login?redirectTo=${url.pathname}`);
    }
}

export async function checkAuth(request: Request): Promise<boolean> {
    try {
        const res = await fetch(`${config.API_URL}/verify`, {
            headers: {
                Cookie: request.headers.get("cookie") ?? "",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "include",
        });

        if (!res.ok) {
            return false;
        }

        const data = await res.json();
        return data.authorized === true;
    } catch (error) {
        return false;
    }
}
