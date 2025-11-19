const TextArea = ({
    label,
    id,
    error,
    onChange,
}: {
    label: string;
    id: string;
    error?: string;
    onChange?: () => void;
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="mb-1 block font-bold">
                {label}
            </label>
            <textarea
                id={id}
                name={id}
                rows={4}
                className={`w-full border ${error ? "border-2 border-red-600" : "border-gray-300"} px-3 py-2`}
                onChange={onChange}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default TextArea;
