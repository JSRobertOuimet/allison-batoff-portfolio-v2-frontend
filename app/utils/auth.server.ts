import { redirect } from "react-router";
import { config } from "../../src/config/environment";

export async function requireAuth(request: Request): Promise<void> {
    try {
        const authRes = await fetch(`${config.API_URL}/cookies`, {
            headers: {
                Cookie: request.headers.get("cookie") ?? "",
                "X-Requested-With": "XMLHttpRequest", // CSRF protection
            },
            credentials: "include",
        });

        if (!authRes.ok) {
            const url = new URL(request.url);
            throw redirect(`/login?redirectTo=${url.pathname}`);
        }

        // Additional validation - check if response is valid JSON
        const data = await authRes.json();
        if (!data.authorized) {
            const url = new URL(request.url);
            throw redirect(`/login?redirectTo=${url.pathname}`);
        }
    } catch (error) {
        // If there's any error in the auth check, redirect to login
        const url = new URL(request.url);
        throw redirect(`/login?redirectTo=${url.pathname}`);
    }
}

export async function checkAuth(request: Request): Promise<boolean> {
    try {
        const authRes = await fetch(`${config.API_URL}/cookies`, {
            headers: {
                Cookie: request.headers.get("cookie") ?? "",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "include",
        });

        if (!authRes.ok) {
            return false;
        }

        const data = await authRes.json();
        return data.authorized === true;
    } catch (error) {
        return false;
    }
}
