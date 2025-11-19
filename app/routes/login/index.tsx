import type { Route } from "./+types";
import type { ActionFunctionArgs } from "react-router";
import {
    redirect,
    useActionData,
    useNavigation,
    Form,
    Link,
} from "react-router";
import { useState } from "react";
import SubmitButton from "~/components/SubmitButton";

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
        const redirectTo = url.searchParams.get("redirectTo") || "/design";

        const setCookieHeader =
            (res.headers as any).getSetCookie?.() ||
            res.headers.get("set-cookie");

        if (Array.isArray(setCookieHeader)) {
            const headers = new Headers();
            for (const c of setCookieHeader) headers.append("Set-Cookie", c);
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

    return { error: "Password is invalid." };
}

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login | Allison Batoff" },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

export default function Login() {
    const actionData = useActionData() as { error?: string };
    const navigation = useNavigation().state;
    const [clientError, setClientError] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;

        if (!password || password.trim() === "") {
            e.preventDefault();
            setClientError("Password is required.");
            return;
        }

        setClientError("");
    };

    return (
        <Form
            method="post"
            className="mx-auto max-w-sm border border-gray-300 p-8"
            onSubmit={handleSubmit}
            noValidate
        >
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
                <label htmlFor="password" className="mb-1 block font-bold">
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    id="password"
                    className={`w-full border ${clientError || actionData?.error ? "border-2 border-red-600" : "border-gray-300"} px-3 py-2 outline-none focus:border-gray-500`}
                />
                {(clientError || actionData?.error) && (
                    <p className="mt-1 text-sm text-red-600">
                        {clientError || "Invalid password, please try again."}
                    </p>
                )}
            </div>

            <SubmitButton state={navigation} label="Submit" block="true" />
        </Form>
    );
}
