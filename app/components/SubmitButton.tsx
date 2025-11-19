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
            className={`${block === "true" ? "w-full" : ""} cursor-pointer bg-gray-950 px-4 py-2 font-bold text-white outline-offset-4 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50`}
            disabled={state === "submitting"}
        >
            {state === "submitting" ? "Sending..." : label}
        </button>
    );
};

export default Button;
