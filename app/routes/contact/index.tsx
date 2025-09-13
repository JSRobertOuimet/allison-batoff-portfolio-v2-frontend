import type { Route } from "../../+types/root";
import { useEffect, useRef } from "react";
import { useActionData, Form, useNavigation } from "react-router";
import { Resend } from "resend";
import { emailTemplate } from "~/utils/emailTemplate";
import PageHeading from "~/components/PageHeading";

export async function action({ request }: { request: Request }) {
    if (request.method !== "POST") {
        return { error: "Method not allowed." };
    }

    try {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: `${process.env.EMAIL_FROM}`,
            to: `${process.env.EMAIL_TO}`,
            replyTo: email,
            subject: subject,
            html: emailTemplate({ name, email, message }),
        });

        return { success: true };
    } catch (error) {
        return {
            error: "Failed to send email.",
            details:
                error instanceof Error
                    ? error.message
                    : "Unknown error",
        };
    }
}

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Contact | Allison Batoff" },
        {
            name: "description",
            content: "Portfolio of UX designer Allison Batoff.",
        },
    ];
}

export default function ContactPage() {
    const data = useActionData() as {
        success?: boolean;
        error?: string;
        details?: string;
    };
    const navigation = useNavigation();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (data?.success && formRef.current) {
            formRef.current.reset();
        }
    }, [data?.success]);

    return (
        <>
            <PageHeading heading="Contact" />
            <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-6">
                    <p className="mb-4">
                        My name is Allison Batoff and I am a user
                        experience designer based out of Ottawa,
                        Ontario.
                    </p>
                    <p className="mb-4">
                        When I'm away from my desk I love to travel and
                        to capture the places I visit through
                        photography.
                    </p>
                    <p className="mb-4">
                        Interested in working together or just curious
                        to learn more? Reach out to me on{" "}
                        <a
                            href="https://www.linkedin.com/in/allisonbatoff/"
                            target="_blank"
                            className="font-medium underline">
                            LinkedIn
                        </a>
                        , or using the contact form, and I will happily
                        answer your questions.
                    </p>
                    <p className="mb-4">
                        I can also be found on{" "}
                        <a
                            href="https://x.com/AllisonBatoff"
                            target="_blank"
                            className="font-medium underline">
                            Twitter
                        </a>{" "}
                        where I share what I learn and what inspires me.
                    </p>
                </div>
                <div className="md:col-span-6 xl:col-span-4 xl:col-start-9 p-8 shadow-2xl">
                    {data?.success && (
                        <div className="mb-4 p-4 bg-green-100 text-green-900">
                            Message sent successfully!
                        </div>
                    )}
                    <p className="text-sm mb-4">
                        All fields are required.
                    </p>
                    <Form method="post" ref={formRef}>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block mb-1 font-bold">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 user-invalid:border user-invalid:border-red-600"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block mb-1 font-bold">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 user-invalid:border user-invalid:border-red-600"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="subject"
                                className="block mb-1 font-bold">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 user-invalid:border user-invalid:border-red-600"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="message"
                                className="block mb-1 font-bold">
                                Message
                            </label>
                            <textarea
                                rows={4}
                                name="message"
                                id="message"
                                className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 user-invalid:border user-invalid:border-red-600"
                                required
                            />
                        </div>
                        <button
                            className="bg-gray-950 hover:bg-gray-800 text-white font-bold py-2 px-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                                navigation.state === "submitting"
                            }>
                            {navigation.state === "submitting"
                                ? "Sending..."
                                : "Submit"}
                        </button>
                    </Form>
                </div>
            </div>
        </>
    );
}
