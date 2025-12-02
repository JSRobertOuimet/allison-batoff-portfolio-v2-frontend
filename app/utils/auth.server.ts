import { redirect } from "react-router";
import { config } from "../config/environment";

export async function requireAuth(request: Request): Promise<void> {
    const url = new URL(request.url);
    const loginPath = `/login?redirectTo=${url.pathname}`;

    try {
        const response = await fetch(`${config.API_URL}/verify`, {
            headers: {
                Cookie: request.headers.get("cookie") ?? "",
                "X-Request-With": "XMLHttpRequest",
            },
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed verification.");

        const data = await response.json();

        if (!data.authorized) throw new Error("Unauthorized.");
    } catch (error) {
        throw redirect(loginPath);
    }
}
