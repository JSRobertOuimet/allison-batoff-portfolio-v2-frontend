import { redirect } from "react-router";
import { config } from "../config/environment";

function getAuthHeaders(request: Request): HeadersInit {
    return {
        Cookie: request.headers.get("cookie") ?? "",
        "X-Requested-With": "XMLHttpRequest",
    };
}

export async function fetchWithAuth(
    url: string,
    request: Request,
    options: RequestInit = {},
): Promise<Response> {
    const fullUrl = url.startsWith("http") ? url : `${config.API_URL}${url}`;

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...getAuthHeaders(request),
            ...options.headers,
        },
        credentials: "include",
    });

    if (!res.ok) {
        const urlObj = new URL(request.url);
        throw redirect(`/login?redirectTo=${urlObj.pathname}`);
    }

    return res;
}

export async function fetchWithAuthJson<T>(
    url: string,
    request: Request,
    options: RequestInit = {},
): Promise<T> {
    const res = await fetchWithAuth(url, request, options);
    const json = await res.json();
    const isStrapiCollectionEndpoint =
        url.includes("/case-studies") ||
        url.includes("/destinations") ||
        url.includes("/categories");

    if (
        isStrapiCollectionEndpoint &&
        json.data === undefined &&
        !("error" in json)
    ) {
        throw new Error("Invalid response from API: missing data property.");
    }

    return json as T;
}
