import { redirect } from "react-router";

export async function requireAuth(request: Request): Promise<void> {
    const authRes = await fetch(
        `${import.meta.env.VITE_API_URL}/cookies`,
        {
            headers: { Cookie: request.headers.get("cookie") ?? "" },
            credentials: "include",
        }
    );

    if (!authRes.ok) {
        const url = new URL(request.url);
        throw redirect(`/login?redirectTo=${url.pathname}`);
    }
}
