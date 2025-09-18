const Input = ({
    type,
    label,
    id,
    error,
    onChange,
}: {
    type: string;
    label: string;
    id: string;
    error?: string;
    onChange?: () => void;
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block mb-1 font-bold">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                className={`w-full border ${error ? "border-2 border-red-600" : "border-gray-300"} px-3 py-2`}
                onChange={onChange}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Input;
