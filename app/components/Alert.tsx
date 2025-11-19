const typeStyles: Record<string, string> = {
    success: "bg-green-100 text-green-900",
    error: "bg-red-100 text-red-900",
    warning: "bg-yellow-100 text-yellow-900",
    info: "bg-blue-100 text-blue-900",
};

const Alert = ({ type, message }: { type: string; message: string }) => {
    const style = typeStyles[type];
    return <div className={`mb-4 p-4 ${style}`}>{message}</div>;
};

export default Alert;
