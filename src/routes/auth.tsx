import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, LoaderCircle, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Access UNDONE" },
      {
        name: "description",
        content: "Sign in or request invite-only access to the protected UNDONE screening and pitch materials.",
      },
      { property: "og:title", content: "Access UNDONE" },
      {
        property: "og:description",
        content: "Sign in or request invite-only access to the protected UNDONE screening and pitch materials.",
      },
      { property: "og:url", content: "/auth" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

type Mode = "signin" | "signup";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (active && data.session) {
        navigate({ to: "/library", replace: true });
      }
    };

    void checkSession();

    return () => {
      active = false;
    };
  }, [navigate]);

  const helperCopy = useMemo(
    () =>
      mode === "signin"
        ? "Already invited? Sign in to check your approval status and open the private library."
        : "Request access for the private screening room and protected pitch materials.",
    [mode],
  );

  const handleEmailAuth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === "signin") {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        navigate({ to: "/library" });
        return;
      }

      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
          data: {
            full_name: fullName,
            company,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.session) {
        navigate({ to: "/library" });
        return;
      }

      setMessage(
        "Request received. Check your email to confirm the account, then sign in to view your approval status.",
      );
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
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: typeof window !== "undefined" ? window.location.origin : undefined,
      });

      if (result.error) {
        throw result.error;
      }

      if (!result.redirected) {
        navigate({ to: "/library" });
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Google sign-in failed.");
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <main className="undone-page flex min-h-screen items-center justify-center px-5 py-14 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.75fr)]">
        <section className="rounded-lg border border-border/60 bg-card/50 p-6 sm:p-8 lg:p-10">
          <p className="undone-eyebrow">Invite-only access</p>
          <h1 className="mt-3 text-4xl font-semibold text-foreground sm:text-6xl">Enter the UNDONE library.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Approved viewers can open the private screening room for Episode 1 and unlock the protected
            pitch deck, one-sheet, series bible, and pilot script.
          </p>
          <div className="mt-10 grid gap-4">
            <div className="rounded-lg border border-border/60 bg-background/45 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Approval-based access</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    New accounts start as pending until approved. Once approved, the private library opens automatically.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/45 p-5">
              <div className="flex items-start gap-3">
                <LockKeyhole className="mt-1 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Protected materials</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Final uploads will stream inside the site with private file access and without obvious download controls.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/45 p-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Need help?</p>
                  <a href="mailto:contact@beartigerproductions.com" className="mt-2 block text-sm leading-6 text-muted-foreground transition-colors hover:text-primary">
                    contact@beartigerproductions.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Card className="rounded-lg border-border/70 bg-card/88 shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-3 pb-3">
            <p className="undone-eyebrow">{mode === "signin" ? "Sign in" : "Request access"}</p>
            <CardTitle className="text-3xl text-foreground">{mode === "signin" ? "Welcome back." : "Create your access request."}</CardTitle>
            <p className="text-sm leading-6 text-muted-foreground">{helperCopy}</p>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg border border-border/60 bg-background/45 p-1">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  mode === "signin" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Request access
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleEmailAuth}>
              {mode === "signup" ? (
                <>
                  <Input
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Full name"
                    autoComplete="name"
                    required
                    className="h-11 rounded-lg border-border/70 bg-background/45"
                  />
                  <Input
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Company / studio (optional)"
                    autoComplete="organization"
                    className="h-11 rounded-lg border-border/70 bg-background/45"
                  />
                </>
              ) : null}
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
                className="h-11 rounded-lg border-border/70 bg-background/45"
              />
              <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                required
                className="h-11 rounded-lg border-border/70 bg-background/45"
              />
              <Button type="submit" disabled={loading} className="h-11 w-full rounded-lg text-sm">
                {loading ? <LoaderCircle className="animate-spin" /> : <ArrowRight />}
                {mode === "signin" ? "Sign in" : "Submit access request"}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-px flex-1 bg-border/60" />
              or
              <span className="h-px flex-1 bg-border/60" />
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={handleGoogleAuth}
              className="h-11 w-full rounded-lg border-border/70 bg-background/45 text-foreground"
            >
              Continue with Google
            </Button>

            {message ? <p className="mt-5 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm leading-6 text-foreground">{message}</p> : null}
            {error ? <p className="mt-5 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm leading-6 text-foreground">{error}</p> : null}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
