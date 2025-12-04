import type { Route } from "./+types";
import type { ActionFunctionArgs } from "react-router";
import {
    redirect,
    useActionData,
    useNavigation,
    Form,
    Link,
} from "react-router";
import { useEffect, useState } from "react";
import SubmitButton from "~/components/SubmitButton";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const password = formData.get("password");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
    });

    if (response.ok) {
        const url = new URL(request.url);
        const redirectTo = url.searchParams.get("redirectTo") || "/design";

        const setCookieHeader =
            (response.headers as any).getSetCookie?.() ||
            response.headers.get("set-cookie");

        if (Array.isArray(setCookieHeader)) {
            const headers = new Headers();

            for (const cookie of setCookieHeader) {
                headers.append("Set-Cookie", cookie);
            }

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
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (actionData?.error) {
            setErrorMessage(actionData.error);
        }
    }, [actionData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;

        setErrorMessage("");

        if (!password || password.trim() === "") {
            e.preventDefault();

            setErrorMessage("Password is required.");

            return;
        }
    };

    return (
        <Form
            method="post"
            className="mx-auto max-w-sm border border-gray-300 p-8"
            onSubmit={handleSubmit}
            noValidate
        >
            <h1 className="sr-only">Login</h1>

            <p className="mb-8 text-center text-balance">
                This is a password-protected section. To get access, please{" "}
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
                    className={`w-full border ${errorMessage ? "border-2 border-red-600" : "border-gray-300"} px-3 py-2 outline-none focus:border-gray-500`}
                />
                {errorMessage && (
                    <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
                )}
            </div>

            <SubmitButton state={navigation} label="Submit" block="true" />
        </Form>
    );
}
