// Environment configuration
const getApiUrl = () => {
    // Check if we're in production
    if (import.meta.env.PROD) {
        // Production: use environment variable or fallback
        return (
            import.meta.env.VITE_API_URL ||
            "https://allison-batoff-portfolio-backend.onrender.com/api"
        );
    }

    // Development: use local server
    return import.meta.env.VITE_API_URL || "http://localhost:1337/api";
};

export const config = {
    API_URL: getApiUrl(),
    IS_PRODUCTION: import.meta.env.PROD,
    IS_DEVELOPMENT: import.meta.env.DEV,
};

export default config;
