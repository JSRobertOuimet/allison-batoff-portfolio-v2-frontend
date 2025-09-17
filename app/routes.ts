import {
    type RouteConfig,
    index,
    layout,
    route,
} from "@react-router/dev/routes";

export default [
    layout("routes/layouts/main.tsx", [
        index("routes/photography/index.tsx"),
        route("photography/:slug", "routes/photography/details.tsx"),
        route("design", "routes/design/index.tsx"),
        route("design/:slug", "routes/design/details.tsx"),
        route("contact", "routes/contact/index.tsx"),
        route("login", "routes/login/index.tsx"),
    ]),
] satisfies RouteConfig;
