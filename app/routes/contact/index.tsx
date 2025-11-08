import type { Route } from "../../+types/root";
import { useEffect, useRef, useState } from "react";
import { useActionData, Form, useNavigation } from "react-router";
import { Resend } from "resend";
import { emailTemplate } from "~/utils/emailTemplate";
import PageHeading from "~/components/PageHeading";
import Input from "~/components/Input";
import TextArea from "~/components/TextArea";
import SubmitButton from "~/components/SubmitButton";
import Alert from "~/components/Alert";

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
        const resend = new Resend(process.env.VITE_RESEND_API_KEY);

        await resend.emails.send({
            from: `${process.env.VITE_EMAIL_FROM}`,
            to: `${process.env.VITE_EMAIL_TO}`,
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
    const navigation = useNavigation().state;
    const formRef = useRef<HTMLFormElement>(null);
    const [clientErrors, setClientErrors] = useState<{
        fullname?: string;
        name?: string;
        email?: string;
        subject?: string;
        message?: string;
    }>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const fullname = formData.get("fullname") as string;
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        const errors: typeof clientErrors = {};

        if (fullname) return;

        if (!name || name.trim() === "") {
            errors.name = "Name is required.";
        }

        if (!email || email.trim() === "") {
            errors.email = "Email address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!subject || subject.trim() === "") {
            errors.subject = "Subject is required.";
        }

        if (!message || message.trim() === "") {
            errors.message = "Message is required.";
        }

        if (Object.keys(errors).length > 0) {
            e.preventDefault();
            setClientErrors(errors);
            return;
        }

        setClientErrors({});
    };

    const clearFieldError = (field: keyof typeof clientErrors) => {
        if (clientErrors[field]) {
            setClientErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    useEffect(() => {
        if (data?.success && formRef.current) {
            formRef.current.reset();
            setClientErrors({});
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
                            className="font-medium underline outline-offset-2">
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
                            className="font-medium underline outline-offset-2">
                            Twitter
                        </a>{" "}
                        where I share what I learn and what inspires me.
                    </p>
                </div>
                <div className="md:col-span-6 xl:col-span-4 xl:col-start-9 p-8 shadow-2xl">
                    {data?.success && (
                        <Alert
                            type="success"
                            message="Message sent successfully!"
                        />
                    )}
                    {data?.error && (
                        <Alert type="error" message={data.error} />
                    )}
                    <p className="text-sm mb-4">
                        All fields are required.
                    </p>
                    <Form
                        method="post"
                        ref={formRef}
                        onSubmit={handleSubmit}
                        noValidate>
                        <input
                            type="text"
                            name="fullname"
                            autoComplete="off"
                            tabIndex={-1}
                            style={{
                                position: "absolute",
                                left: "-9999px",
                            }}
                        />
                        <Input
                            type="text"
                            label="Name"
                            id="name"
                            error={clientErrors.name}
                            onChange={() => clearFieldError("name")}
                        />
                        <Input
                            type="email"
                            label="Email address"
                            id="email"
                            error={clientErrors.email}
                            onChange={() => clearFieldError("email")}
                        />
                        <Input
                            type="text"
                            label="Subject"
                            id="subject"
                            error={clientErrors.subject}
                            onChange={() => clearFieldError("subject")}
                        />
                        <TextArea
                            label="Message"
                            id="message"
                            error={clientErrors.message}
                            onChange={() => clearFieldError("message")}
                        />
                        <SubmitButton
                            state={navigation}
                            label="Submit"
                            block="false"
                        />
                    </Form>
                </div>
            </div>
        </>
    );
}
