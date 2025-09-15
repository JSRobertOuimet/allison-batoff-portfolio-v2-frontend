const Button = ({
    state,
    label,
    block,
}: {
    state: string;
    label: string;
    block: string;
}) => {
    return (
        <button
            className={`${block === "true" ? "w-full" : ""} bg-gray-950 hover:bg-gray-800 text-white font-bold py-2 px-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={state === "submitting"}>
            {state === "submitting" ? "Sending..." : label}
        </button>
    );
};

export default Button;
