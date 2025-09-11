import type { ActionFunctionArgs } from "react-router";
import { redirect, useActionData, Form, Link } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const password = formData.get("password");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
    });

    if (res.ok) {
        const url = new URL(request.url);
        const redirectTo =
            url.searchParams.get("redirectTo") || "/design";

        const setCookieHeader =
            (res.headers as any).getSetCookie?.() ||
            res.headers.get("set-cookie");

        if (Array.isArray(setCookieHeader)) {
            const headers = new Headers();
            for (const c of setCookieHeader)
                headers.append("Set-Cookie", c);
            return redirect(redirectTo, { headers });
        }

        if (typeof setCookieHeader === "string") {
            return redirect(redirectTo, {
                headers: {
                    "Set-Cookie": setCookieHeader,
                },
            });
        }

        return redirect(redirectTo);
    }

    return { error: "The password is invalid." };
}

export default function Login() {
    const actionData = useActionData() as { error?: string };

    return (
        <Form
            method="post"
            className="p-8 border border-gray-200 max-w-sm mx-auto">
            <h1 className="sr-only">Login</h1>

            <p className="mb-8 text-center">
                This section is password protected.
                <br />
                To get access, please{" "}
                <Link to="/contact" className="font-medium underline">
                    contact me
                </Link>
                .
            </p>

            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block mb-1 font-bold">
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    id="password"
                    className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 user-invalid:border user-invalid:border-red-600"
                    required
                />
            </div>

            {actionData?.error && (
                <div className="text-red-600 mb-4">
                    {actionData.error}
                </div>
            )}

            <button className="mt-4 bg-gray-950 hover:bg-gray-800 text-white font-bold py-2 px-4 cursor-pointer w-full">
                Submit
            </button>
        </Form>
    );
}
