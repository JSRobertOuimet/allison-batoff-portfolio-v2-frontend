import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home/index.tsx"),
    route("photography", "routes/photography/index.tsx"),
    route("design", "routes/design/index.tsx"),
    route("contact", "routes/contact/index.tsx"),
] satisfies RouteConfig;
