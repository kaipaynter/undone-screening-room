import { t as supabase } from "./client-Bo7GazLS.js";
import { d as siteMetadata } from "./undone-content-Bv4qBZlZ.js";
import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/styles.css?url
var styles_default = "/assets/styles-B_zE_Qqc.css";
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "UNDONE" },
			{
				name: "description",
				content: "UNDONE is a coming-of-age dramedy blending romance, identity, music, and cultural tension."
			},
			{
				property: "og:title",
				content: "UNDONE"
			},
			{
				property: "og:description",
				content: "UNDONE is a coming-of-age dramedy blending romance, identity, music, and cultural tension."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "UNDONE"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "UNDONE"
			})
		}],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	const router = useRouter();
	useEffect(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => {
			subscription.unsubscribe();
		};
	}, [queryClient, router]);
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
}
//#endregion
//#region src/routes/auth.tsx
var $$splitComponentImporter$3 = () => import("./auth-iI1BgB2o.js");
var Route$3 = createFileRoute("/auth")({
	head: () => ({
		meta: [
			{ title: "Access UNDONE" },
			{
				name: "description",
				content: "Sign in or request invite-only access to the protected UNDONE screening and pitch materials."
			},
			{
				property: "og:title",
				content: "Access UNDONE"
			},
			{
				property: "og:description",
				content: "Sign in or request invite-only access to the protected UNDONE screening and pitch materials."
			},
			{
				property: "og:url",
				content: "/auth"
			},
			{
				name: "robots",
				content: "noindex, nofollow"
			}
		],
		links: [{
			rel: "canonical",
			href: "/auth"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/_authenticated/route.tsx
var $$splitComponentImporter$2 = () => import("./route-Di7iQBCH.js");
var Route$2 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$1 = () => import("./routes-CaSTIE0_.js");
var Route$1 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: siteMetadata.title },
			{
				name: "description",
				content: siteMetadata.description
			},
			{
				property: "og:title",
				content: siteMetadata.title
			},
			{
				property: "og:description",
				content: siteMetadata.description
			},
			{
				property: "og:url",
				content: "/"
			},
			{
				name: "twitter:title",
				content: siteMetadata.title
			},
			{
				name: "twitter:description",
				content: siteMetadata.description
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "TVSeries",
				name: "UNDONE",
				description: siteMetadata.description,
				genre: [
					"Drama",
					"Romance",
					"Comedy"
				]
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/_authenticated/library.tsx
var $$splitComponentImporter = () => import("./library-CZTM4AxB.js");
var Route = createFileRoute("/_authenticated/library")({
	head: () => ({
		meta: [
			{ title: "UNDONE Library" },
			{
				name: "description",
				content: "Private screening room and protected UNDONE pitch materials."
			},
			{
				property: "og:title",
				content: "UNDONE Library"
			},
			{
				property: "og:description",
				content: "Private screening room and protected UNDONE pitch materials."
			},
			{
				property: "og:url",
				content: "/library"
			},
			{
				name: "robots",
				content: "noindex, nofollow"
			}
		],
		links: [{
			rel: "canonical",
			href: "/library"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var AuthRoute = Route$3.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$4
});
var AuthenticatedRouteRoute = Route$2.update({
	id: "/_authenticated",
	getParentRoute: () => Route$4
});
var IndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$4
});
var AuthenticatedRouteRouteChildren = { AuthenticatedLibraryRoute: Route.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => AuthenticatedRouteRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
