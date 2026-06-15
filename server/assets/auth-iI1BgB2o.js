import { t as supabase } from "./client-Bo7GazLS.js";
import { a as Button, i as CardTitle, n as CardContent, o as cn, r as CardHeader, t as Card } from "./card-4c7XVYPp.js";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, LoaderCircle, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
//#region src/integrations/lovable/index.ts
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		redirect_uri: opts?.redirect_uri,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/routes/auth.tsx?tsr-split=component
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = useState("signin");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [company, setCompany] = useState("");
	useEffect(() => {
		let active = true;
		const checkSession = async () => {
			const { data } = await supabase.auth.getSession();
			if (active && data.session) navigate({
				to: "/library",
				replace: true
			});
		};
		checkSession();
		return () => {
			active = false;
		};
	}, [navigate]);
	const helperCopy = useMemo(() => mode === "signin" ? "Already invited? Sign in to check your approval status and open the private library." : "Request access for the private screening room and protected pitch materials.", [mode]);
	const handleEmailAuth = async (event) => {
		event.preventDefault();
		setLoading(true);
		setError(null);
		setMessage(null);
		try {
			if (mode === "signin") {
				const { error: signInError } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (signInError) throw signInError;
				navigate({ to: "/library" });
				return;
			}
			const { error: signUpError, data } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: typeof window !== "undefined" ? window.location.origin : void 0,
					data: {
						full_name: fullName,
						company
					}
				}
			});
			if (signUpError) throw signUpError;
			if (data.session) {
				navigate({ to: "/library" });
				return;
			}
			setMessage("Request received. Check your email to confirm the account, then sign in to view your approval status.");
			setMode("signin");
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Something went wrong.");
		} finally {
			setLoading(false);
		}
	};
	const handleGoogleAuth = async () => {
		setLoading(true);
		setError(null);
		setMessage(null);
		try {
			const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: typeof window !== "undefined" ? window.location.origin : void 0 });
			if (result.error) throw result.error;
			if (!result.redirected) navigate({ to: "/library" });
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Google sign-in failed.");
			setLoading(false);
			return;
		}
		setLoading(false);
	};
	return /* @__PURE__ */ jsx("main", {
		className: "undone-page flex min-h-screen items-center justify-center px-5 py-14 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.75fr)]",
			children: [/* @__PURE__ */ jsxs("section", {
				className: "rounded-lg border border-border/60 bg-card/50 p-6 sm:p-8 lg:p-10",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "undone-eyebrow",
						children: "Invite-only access"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-3 text-4xl font-semibold text-foreground sm:text-6xl",
						children: "Enter the UNDONE library."
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg",
						children: "Approved viewers can open the private screening room for Episode 1 and unlock the protected pitch deck, one-sheet, series bible, and pilot script."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-10 grid gap-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "rounded-lg border border-border/60 bg-background/45 p-5",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "mt-1 text-primary" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium text-foreground",
										children: "Approval-based access"
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-2 text-sm leading-6 text-muted-foreground",
										children: "New accounts start as pending until approved. Once approved, the private library opens automatically."
									})] })]
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "rounded-lg border border-border/60 bg-background/45 p-5",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx(LockKeyhole, { className: "mt-1 text-primary" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium text-foreground",
										children: "Protected materials"
									}), /* @__PURE__ */ jsx("p", {
										className: "mt-2 text-sm leading-6 text-muted-foreground",
										children: "Final uploads will stream inside the site with private file access and without obvious download controls."
									})] })]
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "rounded-lg border border-border/60 bg-background/45 p-5",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx(Mail, { className: "mt-1 text-primary" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-sm font-medium text-foreground",
										children: "Need help?"
									}), /* @__PURE__ */ jsx("a", {
										href: "mailto:contact@beartigerproductions.com",
										className: "mt-2 block text-sm leading-6 text-muted-foreground transition-colors hover:text-primary",
										children: "contact@beartigerproductions.com"
									})] })]
								})
							})
						]
					})
				]
			}), /* @__PURE__ */ jsxs(Card, {
				className: "rounded-lg border-border/70 bg-card/88 shadow-2xl backdrop-blur-sm",
				children: [/* @__PURE__ */ jsxs(CardHeader, {
					className: "space-y-3 pb-3",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "undone-eyebrow",
							children: mode === "signin" ? "Sign in" : "Request access"
						}),
						/* @__PURE__ */ jsx(CardTitle, {
							className: "text-3xl text-foreground",
							children: mode === "signin" ? "Welcome back." : "Create your access request."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm leading-6 text-muted-foreground",
							children: helperCopy
						})
					]
				}), /* @__PURE__ */ jsxs(CardContent, { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-6 grid grid-cols-2 gap-2 rounded-lg border border-border/60 bg-background/45 p-1",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setMode("signin"),
							className: `rounded-md px-3 py-2 text-sm transition-colors ${mode === "signin" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
							children: "Sign in"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setMode("signup"),
							className: `rounded-md px-3 py-2 text-sm transition-colors ${mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
							children: "Request access"
						})]
					}),
					/* @__PURE__ */ jsxs("form", {
						className: "space-y-4",
						onSubmit: handleEmailAuth,
						children: [
							mode === "signup" ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Input, {
								value: fullName,
								onChange: (event) => setFullName(event.target.value),
								placeholder: "Full name",
								autoComplete: "name",
								required: true,
								className: "h-11 rounded-lg border-border/70 bg-background/45"
							}), /* @__PURE__ */ jsx(Input, {
								value: company,
								onChange: (event) => setCompany(event.target.value),
								placeholder: "Company / studio (optional)",
								autoComplete: "organization",
								className: "h-11 rounded-lg border-border/70 bg-background/45"
							})] }) : null,
							/* @__PURE__ */ jsx(Input, {
								value: email,
								onChange: (event) => setEmail(event.target.value),
								type: "email",
								placeholder: "Email",
								autoComplete: "email",
								required: true,
								className: "h-11 rounded-lg border-border/70 bg-background/45"
							}),
							/* @__PURE__ */ jsx(Input, {
								value: password,
								onChange: (event) => setPassword(event.target.value),
								type: "password",
								placeholder: "Password",
								autoComplete: mode === "signin" ? "current-password" : "new-password",
								required: true,
								className: "h-11 rounded-lg border-border/70 bg-background/45"
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "submit",
								disabled: loading,
								className: "h-11 w-full rounded-lg text-sm",
								children: [loading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ jsx(ArrowRight, {}), mode === "signin" ? "Sign in" : "Submit access request"]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-6 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-border/60" }),
							"or",
							/* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-border/60" })
						]
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "button",
						variant: "outline",
						disabled: loading,
						onClick: handleGoogleAuth,
						className: "h-11 w-full rounded-lg border-border/70 bg-background/45 text-foreground",
						children: "Continue with Google"
					}),
					message ? /* @__PURE__ */ jsx("p", {
						className: "mt-5 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm leading-6 text-foreground",
						children: message
					}) : null,
					error ? /* @__PURE__ */ jsx("p", {
						className: "mt-5 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm leading-6 text-foreground",
						children: error
					}) : null
				] })]
			})]
		})
	});
}
//#endregion
export { AuthPage as component };
