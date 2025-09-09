import type { Route } from "../../+types/root";
import PageHeading from "~/components/PageHeading";

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
                        When I’m away from my desk I love to travel and
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
                <form action="" className="md:col-span-6 lg:col-span-4 lg:col-start-8 p-8 border border-gray-300">
                    <p className="text-sm mb-4">
                        All fields are required.
                    </p>
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
                            className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:ring focus:ring-gray-200"
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
                            className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:ring focus:ring-gray-200"
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
                            className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:ring focus:ring-gray-200"
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
                            className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:ring focus:ring-gray-200"
                            required
                        />
                    </div>
                    <button className="bg-gray-950 hover:bg-gray-800 text-white font-bold py-2 px-4 cursor-pointer">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}
