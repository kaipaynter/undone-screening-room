import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock3, FileText, LoaderCircle, Lock, LogOut, PlayCircle, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { documents } from "@/lib/undone-content";

export const Route = createFileRoute("/_authenticated/library")({
  head: () => ({
    meta: [
      { title: "UNDONE Library" },
      { name: "description", content: "Private screening room and protected UNDONE pitch materials." },
      { property: "og:title", content: "UNDONE Library" },
      { property: "og:description", content: "Private screening room and protected UNDONE pitch materials." },
      { property: "og:url", content: "/library" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/library" }],
  }),
  component: LibraryPage,
});

type Profile = Tables<"profiles">;

function LibraryPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          navigate({ to: "/auth", replace: true });
          return;
        }

        const { data: currentProfile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (profileError) {
          throw profileError;
        }

        if (currentProfile) {
          if (active) {
            setProfile(currentProfile);
          }
          return;
        }

        const { data: createdProfile, error: createError } = await supabase
          .from("profiles")
          .insert({
            user_id: user.id,
            email: user.email ?? null,
            full_name:
              typeof user.user_metadata.full_name === "string"
                ? user.user_metadata.full_name
                : typeof user.user_metadata.name === "string"
                  ? user.user_metadata.name
                  : null,
            company:
              typeof user.user_metadata.company === "string" ? user.user_metadata.company : null,
          })
          .select("*")
          .single();

        if (createError) {
          throw createError;
        }

        if (active) {
          setProfile(createdProfile);
        }
      } catch (caught) {
        if (active) {
          setError(caught instanceof Error ? caught.message : "Unable to load your library access.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (loading) {
    return (
      <main className="undone-page flex min-h-screen items-center justify-center px-6">
        <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/60 px-5 py-4 text-sm text-foreground">
          <LoaderCircle className="animate-spin text-primary" />
          Loading private library…
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="undone-page flex min-h-screen items-center justify-center px-6">
        <Card className="w-full max-w-xl rounded-lg border-border/70 bg-card/85">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Library unavailable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">{error}</p>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => navigate({ to: "/auth", replace: true })} className="rounded-lg">
                Return to access page
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const approved = profile?.access_status === "approved";
  const revoked = profile?.access_status === "revoked";

  return (
    <main className="undone-page min-h-screen px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 rounded-lg border border-border/60 bg-card/55 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
          <div>
            <p className="undone-eyebrow">Private library</p>
            <h1 className="mt-3 text-4xl font-semibold text-foreground sm:text-6xl">UNDONE screening room</h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}. This is the protected home for Episode 1 and the downloadable pitch materials.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="rounded-md px-3 py-1 text-xs uppercase tracking-[0.14em]">
              {profile?.access_status ?? "pending"}
            </Badge>
            <Button variant="outline" onClick={handleSignOut} className="rounded-lg border-border/70 bg-background/45 text-foreground">
              <LogOut />
              Sign out
            </Button>
          </div>
        </div>

        {!approved ? (
          <section className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <Card className="rounded-lg border-border/70 bg-card/70 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                  {revoked ? <Lock className="text-primary" /> : <Clock3 className="text-primary" />}
                  {revoked ? "Access revoked" : "Approval pending"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-7 text-muted-foreground">
                  {revoked
                    ? "This account currently does not have access to the protected materials. Reach out directly if you believe this is incorrect."
                    : "Your account request has been received. Once approved, Episode 1 and the protected documents will unlock here automatically."}
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Contact: <a href="mailto:contact@beartigerproductions.com" className="text-foreground underline underline-offset-4">contact@beartigerproductions.com</a>
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-lg border-border/70 bg-card/70 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                  <ShieldCheck className="text-primary" />
                  What unlocks after approval
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <li>Episode 1 private screening room</li>
                  <li>Pitch deck download slot</li>
                  <li>One-sheet download slot</li>
                  <li>Series bible download slot</li>
                  <li>Pilot script reader / download slot</li>
                </ul>
              </CardContent>
            </Card>
          </section>
        ) : (
          <>
            <section className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
              <Card className="rounded-lg border-border/70 bg-card/70 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                    <PlayCircle className="text-primary" />
                    Episode 1 — “The Party”
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-primary/40 bg-background/55">
                    <div className="text-center">
                      <PlayCircle className="mx-auto text-primary" />
                      <p className="mt-3 text-sm font-medium text-foreground">Private streaming slot ready</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-muted-foreground">
                    Final media will stream in-page here for approved viewers. Native download controls
                    can be minimized, but no web player can fully prevent screen recording or capture.
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-lg border-border/70 bg-card/70 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                    <ShieldCheck className="text-primary" />
                    Access state
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Your account is approved. As final materials are added, they will appear here without any change to your login flow.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section className="mt-8">
              <div className="mb-5">
                <p className="undone-eyebrow">Protected documents</p>
                <h2 className="mt-2 text-3xl font-semibold text-foreground">Pitch materials</h2>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {documents.map((document) => (
                  <Card key={document.title} className="rounded-lg border-border/70 bg-card/70 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-xl text-foreground">
                        <FileText className="text-primary" />
                        {document.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-muted-foreground">{document.detail}</p>
                      <Button disabled className="mt-6 w-full rounded-lg">
                        Protected file slot
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
