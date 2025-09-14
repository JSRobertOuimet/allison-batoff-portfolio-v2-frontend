const Input = ({
    type,
    label,
    id,
}: {
    type: string;
    label: string;
    id: string;
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
                className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 user-invalid:border user-invalid:border-red-600"
                required
            />
        </div>
    );
};

export default Input;
