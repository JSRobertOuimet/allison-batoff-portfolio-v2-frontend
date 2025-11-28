import { redirect } from "react-router";
import { fetchWithAuthJson } from "./api";

export async function requireAuth(request: Request): Promise<void> {
    try {
        const data = await fetchWithAuthJson<{ authorized: boolean }>(
            "/verify",
            request,
        );

        if (!data.authorized) {
            const url = new URL(request.url);
            throw redirect(`/login?redirectTo=${url.pathname}`);
        }
    } catch (error) {
        if (error && typeof error === "object" && "status" in error) {
            throw error;
        }

        const url = new URL(request.url);

        throw redirect(`/login?redirectTo=${url.pathname}`);
    }
}
