import { t as supabase } from "./client-Bo7GazLS.js";
import { r as documents } from "./undone-content-Bv4qBZlZ.js";
import { a as Button, i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-4c7XVYPp.js";
import { t as Badge } from "./badge-DdbTWq03.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient } from "@tanstack/react-query";
import { Clock3, FileText, LoaderCircle, Lock, LogOut, PlayCircle, ShieldCheck } from "lucide-react";
//#region src/routes/_authenticated/library.tsx?tsr-split=component
function LibraryPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [profile, setProfile] = useState(null);
	useEffect(() => {
		let active = true;
		const loadProfile = async () => {
			try {
				const { data: { user }, error: userError } = await supabase.auth.getUser();
				if (userError || !user) {
					navigate({
						to: "/auth",
						replace: true
					});
					return;
				}
				const { data: currentProfile, error: profileError } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle();
				if (profileError) throw profileError;
				if (currentProfile) {
					if (active) setProfile(currentProfile);
					return;
				}
				const { data: createdProfile, error: createError } = await supabase.from("profiles").insert({
					user_id: user.id,
					email: user.email ?? null,
					full_name: typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name : typeof user.user_metadata.name === "string" ? user.user_metadata.name : null,
					company: typeof user.user_metadata.company === "string" ? user.user_metadata.company : null
				}).select("*").single();
				if (createError) throw createError;
				if (active) setProfile(createdProfile);
			} catch (caught) {
				if (active) setError(caught instanceof Error ? caught.message : "Unable to load your library access.");
			} finally {
				if (active) setLoading(false);
			}
		};
		loadProfile();
		return () => {
			active = false;
		};
	}, [navigate]);
	const handleSignOut = async () => {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	};
	if (loading) return /* @__PURE__ */ jsx("main", {
		className: "undone-page flex min-h-screen items-center justify-center px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 px-5 py-4 text-sm text-foreground",
			children: [/* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin text-primary" }), "Loading private library…"]
		})
	});
	if (error) return /* @__PURE__ */ jsx("main", {
		className: "undone-page flex min-h-screen items-center justify-center px-6",
		children: /* @__PURE__ */ jsxs(Card, {
			className: "w-full max-w-xl rounded-lg border-border/70 bg-card/85",
			children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, {
				className: "text-2xl text-foreground",
				children: "Library unavailable"
			}) }), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx("p", {
				className: "text-sm leading-6 text-muted-foreground",
				children: error
			}), /* @__PURE__ */ jsx("div", {
				className: "mt-6 flex gap-3",
				children: /* @__PURE__ */ jsx(Button, {
					onClick: () => navigate({
						to: "/auth",
						replace: true
					}),
					className: "rounded-lg",
					children: "Return to access page"
				})
			})] })]
		})
	});
	const approved = profile?.access_status === "approved";
	const revoked = profile?.access_status === "revoked";
	return /* @__PURE__ */ jsx("main", {
		className: "undone-page min-h-screen px-5 py-10 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-6 rounded-lg border border-border/60 bg-card/55 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("p", {
						className: "undone-eyebrow",
						children: "Private library"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-3 text-4xl font-semibold text-foreground sm:text-6xl",
						children: "UNDONE screening room"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg",
						children: [
							"Welcome",
							profile?.full_name ? `, ${profile.full_name}` : "",
							". This is the protected home for Episode 1 and the downloadable pitch materials."
						]
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ jsx(Badge, {
						className: "rounded-md px-3 py-1 text-xs uppercase tracking-[0.14em]",
						children: profile?.access_status ?? "pending"
					}), /* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						onClick: handleSignOut,
						className: "rounded-lg border-border/70 bg-background/45 text-foreground",
						children: [/* @__PURE__ */ jsx(LogOut, {}), "Sign out"]
					})]
				})]
			}), !approved ? /* @__PURE__ */ jsxs("section", {
				className: "mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "rounded-lg border-border/70 bg-card/70 shadow-lg",
					children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
						className: "flex items-center gap-3 text-2xl text-foreground",
						children: [revoked ? /* @__PURE__ */ jsx(Lock, { className: "text-primary" }) : /* @__PURE__ */ jsx(Clock3, { className: "text-primary" }), revoked ? "Access revoked" : "Approval pending"]
					}) }), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx("p", {
						className: "text-base leading-7 text-muted-foreground",
						children: revoked ? "This account currently does not have access to the protected materials. Reach out directly if you believe this is incorrect." : "Your account request has been received. Once approved, Episode 1 and the protected documents will unlock here automatically."
					}), /* @__PURE__ */ jsxs("p", {
						className: "mt-4 text-sm leading-6 text-muted-foreground",
						children: [
							"Contact:",
							" ",
							/* @__PURE__ */ jsx("a", {
								href: "mailto:contact@beartigerproductions.com",
								className: "text-foreground underline underline-offset-4",
								children: "contact@beartigerproductions.com"
							})
						]
					})] })]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "rounded-lg border-border/70 bg-card/70 shadow-lg",
					children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
						className: "flex items-center gap-3 text-2xl text-foreground",
						children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "text-primary" }), "What unlocks after approval"]
					}) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("ul", {
						className: "space-y-3 text-sm leading-6 text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx("li", { children: "Episode 1 private screening room" }),
							/* @__PURE__ */ jsx("li", { children: "Pitch deck download slot" }),
							/* @__PURE__ */ jsx("li", { children: "One-sheet download slot" }),
							/* @__PURE__ */ jsx("li", { children: "Series bible download slot" }),
							/* @__PURE__ */ jsx("li", { children: "Pilot script reader / download slot" })
						]
					}) })]
				})]
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
				className: "mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "rounded-lg border-border/70 bg-card/70 shadow-lg",
					children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
						className: "flex items-center gap-3 text-2xl text-foreground",
						children: [/* @__PURE__ */ jsx(PlayCircle, { className: "text-primary" }), "Episode 1 — “The Party”"]
					}) }), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx("div", {
						className: "flex aspect-video items-center justify-center rounded-lg border border-dashed border-primary/40 bg-background/55",
						children: /* @__PURE__ */ jsxs("div", {
							className: "text-center",
							children: [/* @__PURE__ */ jsx(PlayCircle, { className: "mx-auto text-primary" }), /* @__PURE__ */ jsx("p", {
								className: "mt-3 text-sm font-medium text-foreground",
								children: "Private streaming slot ready"
							})]
						})
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-5 text-sm leading-6 text-muted-foreground",
						children: "Final media will stream in-page here for approved viewers. Native download controls can be minimized, but no web player can fully prevent screen recording or capture."
					})] })]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "rounded-lg border-border/70 bg-card/70 shadow-lg",
					children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
						className: "flex items-center gap-3 text-2xl text-foreground",
						children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "text-primary" }), "Access state"]
					}) }), /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("p", {
						className: "text-sm leading-6 text-muted-foreground",
						children: "Your account is approved. As final materials are added, they will appear here without any change to your login flow."
					}) })]
				})]
			}), /* @__PURE__ */ jsxs("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-5",
					children: [/* @__PURE__ */ jsx("p", {
						className: "undone-eyebrow",
						children: "Protected documents"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-2 text-3xl font-semibold text-foreground",
						children: "Pitch materials"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid gap-5 md:grid-cols-2 xl:grid-cols-4",
					children: documents.map((document) => /* @__PURE__ */ jsxs(Card, {
						className: "rounded-lg border-border/70 bg-card/70 shadow-lg",
						children: [/* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, {
							className: "flex items-center gap-3 text-xl text-foreground",
							children: [/* @__PURE__ */ jsx(FileText, { className: "text-primary" }), document.title]
						}) }), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm leading-6 text-muted-foreground",
							children: document.detail
						}), /* @__PURE__ */ jsx(Button, {
							disabled: true,
							className: "mt-6 w-full rounded-lg",
							children: "Protected file slot"
						})] })]
					}, document.title))
				})]
			})] })]
		})
	});
}
//#endregion
export { LibraryPage as component };
