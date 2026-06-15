import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  FileText,
  Lock,
  Mail,
  MapPin,
  Play,
  ShieldCheck,
  Users,
} from "lucide-react";

import audienceImage from "@/assets/undone-audience.png.asset.json";
import charactersImage from "@/assets/undone-characters.png.asset.json";
import creativeLeadershipImage from "@/assets/undone-creative-leadership.png.asset.json";
import oneSheetImage from "@/assets/undone-one-sheet.png.asset.json";
import productionTeamImage from "@/assets/undone-production-team.png.asset.json";
import whyImage from "@/assets/undone-why.png.asset.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  audiencePoints,
  contact,
  documents,
  episodes,
  keyFacts,
  leadership,
  logline,
  overviewBlurb,
  productionTeam,
  reasonsToWatch,
  siteMetadata,
  teamStats,
  trailerSlots,
} from "@/lib/undone-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: siteMetadata.title },
      { name: "description", content: siteMetadata.description },
      { property: "og:title", content: siteMetadata.title },
      { property: "og:description", content: siteMetadata.description },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: siteMetadata.title },
      { name: "twitter:description", content: siteMetadata.description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TVSeries",
          name: "UNDONE",
          description: siteMetadata.description,
          genre: ["Drama", "Romance", "Comedy"],
        }),
      },
    ],
  }),
  component: UndoneHomePage,
});

function UndoneHomePage() {
  return (
    <main className="undone-page">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="undone-wordmark" aria-label="UNDONE home">
            UNDONE
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#story" className="transition-colors hover:text-foreground">
              Story
            </a>
            <a href="#audience" className="transition-colors hover:text-foreground">
              Audience
            </a>
            <a href="#team" className="transition-colors hover:text-foreground">
              Team
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-lg border-border/70 bg-card/60 text-foreground"
            >
              <a href="#trailers">Watch trailers</a>
            </Button>
            <Button asChild className="rounded-lg">
              <Link to="/auth">
                Request access
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden border-b border-border/60">
        <img
          src={charactersImage.url}
          alt="Coastal Los Angeles imagery from the UNDONE pitch materials"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/74" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/76 to-background/20" />
        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,420px)] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <Badge
              variant="outline"
              className="mb-6 w-fit rounded-md border-primary/50 bg-card/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary"
            >
              TV series pitch website
            </Badge>
            <h1 className="undone-display mb-6 max-w-4xl text-5xl sm:text-6xl lg:text-8xl">
              UNDONE
            </h1>
            <p className="mb-5 max-w-3xl text-xl leading-8 text-foreground sm:text-2xl sm:leading-9">
              {logline}
            </p>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {overviewBlurb}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-lg px-6">
                <a href="#trailers">
                  <Play />
                  Watch trailer
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border-primary/40 bg-card/60 text-foreground"
              >
                <Link to="/auth">
                  <Lock />
                  Episode 1 + materials
                </Link>
              </Button>
            </div>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {keyFacts.map((fact) => (
                <li
                  key={fact.label}
                  className="rounded-lg border border-border/60 bg-card/70 p-4 backdrop-blur-sm"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-primary">{fact.label}</p>
                  <p className="mt-2 text-sm leading-6 text-foreground">{fact.value}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-end">
            <Card className="w-full rounded-lg border-primary/20 bg-card/88 shadow-2xl backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-foreground">Access model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 text-sm leading-6 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 text-primary" />
                  <p>
                    Public visitors can view the logline, pitch imagery, team, creator bios,
                    contact, and trailer placeholders.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 text-primary" />
                  <p>
                    Approved viewers get access to Episode 1, the pitch deck, one-sheet, series
                    bible, and pilot script inside the private library.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 text-primary" />
                  <p>
                    The full gated structure is built now so final media files can be added without
                    redesigning the experience.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="story" className="undone-section">
        <div className="undone-wrap grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div>
            <p className="undone-eyebrow">Key art + one-sheet</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-5xl">
              Intimate romance collides with music, ambition, and cultural tension.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              The pitch positions UNDONE as a sharp, emotionally literate series: a love story that
              is not only about chemistry, but about what it really takes to stay present once the
              fantasy burns off.
            </p>
            <div className="mt-8 space-y-4">
              {documents.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/55 p-4"
                >
                  <FileText className="mt-1 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-sm leading-6 text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
            <img
              src={oneSheetImage.url}
              alt="UNDONE one-sheet concept art and story notes"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="trailers" className="undone-section">
        <div className="undone-wrap">
          <p className="undone-eyebrow">Public media</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-foreground sm:text-5xl">
                Trailer-ready public experience
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                The public-facing media area is live structurally now. Final trailer files can be
                dropped into these slots later without changing the page architecture.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {trailerSlots.map((slot) => (
              <Card key={slot.title} className="rounded-lg border-border/70 bg-card/65 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-4 text-xl text-foreground">
                    <span>{slot.title}</span>
                    <Badge
                      variant={slot.publicAccess ? "outline" : "default"}
                      className="rounded-md"
                    >
                      {slot.publicAccess ? "Public" : "Protected"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-primary/40 bg-background/60">
                    <div className="text-center">
                      <Play className="mx-auto text-primary" />
                      <p className="mt-3 text-sm font-medium text-foreground">
                        Upload-ready player shell
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-muted-foreground">{slot.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="audience" className="undone-section">
        <div className="undone-wrap grid gap-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)]">
          <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
            <img
              src={audienceImage.url}
              alt="Audience positioning image from the UNDONE pitch deck"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="undone-eyebrow">The audience</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-5xl">
              Built for Gen Z and Millennial viewers who want romance with consequence.
            </h2>
            <div className="mt-8 grid gap-4">
              {audiencePoints.map((point) => (
                <div key={point} className="rounded-lg border border-border/60 bg-card/55 p-5">
                  <p className="text-base leading-7 text-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="undone-section">
        <div className="undone-wrap grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div>
            <p className="undone-eyebrow">Why UNDONE</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-5xl">
              The spark is only the beginning.
            </h2>
            <div className="mt-8 grid gap-5">
              {reasonsToWatch.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-lg border border-border/60 bg-card/55 p-5"
                >
                  <p className="text-sm uppercase tracking-[0.14em] text-primary">{reason.title}</p>
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{reason.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
            <img
              src={whyImage.url}
              alt="Why UNDONE concept image from the pitch materials"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="undone-section">
        <div className="undone-wrap">
          <div className="max-w-3xl">
            <p className="undone-eyebrow">Season arc</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-5xl">
              Ten episodes that escalate intimacy, fracture, and reckoning.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {episodes.map((episode) => (
              <Card
                key={episode.title}
                className="rounded-lg border-border/70 bg-card/55 shadow-lg"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-foreground">{episode.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{episode.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="undone-section">
        <div className="undone-wrap grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
              <img
                src={creativeLeadershipImage.url}
                alt="Creative leadership portraits from the UNDONE pitch materials"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40">
              <img
                src={productionTeamImage.url}
                alt="UNDONE production team group photo"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <p className="undone-eyebrow">Creative leadership + production team</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-5xl">
              A young, bold team with full-female creative leadership.
            </h2>
            <div className="mt-8 grid gap-5">
              {leadership.map((person) => (
                <Card
                  key={person.name}
                  className="rounded-lg border-border/70 bg-card/55 shadow-lg"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl text-foreground">{person.name}</CardTitle>
                    <p className="text-sm uppercase tracking-[0.14em] text-primary">
                      {person.role}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-7 text-foreground">{person.summary}</p>
                    <div className="mt-4 space-y-3">
                      {person.body.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-6 text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
              <div className="rounded-lg border border-border/60 bg-card/55 p-5">
                <p className="text-sm uppercase tracking-[0.14em] text-primary">Team specs</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                  {teamStats.map((stat) => (
                    <li key={stat} className="flex gap-3">
                      <ChevronRight className="mt-1 size-4 text-primary" />
                      <span>{stat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-border/60 bg-card/55 p-5">
                <p className="text-sm uppercase tracking-[0.14em] text-primary">Full team roster</p>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-2">
                  {productionTeam.map((member) => (
                    <li key={member} className="flex gap-3">
                      <Users className="mt-1 size-4 text-primary" />
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="undone-section pb-24">
        <div className="undone-wrap grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="rounded-lg border border-border/60 bg-card/55 p-6 sm:p-8">
            <p className="undone-eyebrow">Protected access</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-5xl">
              Request the full private library.
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
              Approved viewers receive access to the Episode 1 screening room and the protected
              document library. Until final media is uploaded, the secure structure and approval
              flow are in place and ready to receive those files.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-lg px-6">
                <Link to="/auth">Sign in or request access</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg border-primary/40 bg-card/60 text-foreground"
              >
                <Link to="/library">Open library</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border/60 bg-card/55 p-6 sm:p-8">
            <p className="undone-eyebrow">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-5xl">
              Let’s make television history.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-7 text-foreground sm:text-lg">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 text-primary" />
                <a
                  className="transition-colors hover:text-primary"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
              </div>
              <Separator className="bg-border/60" />
              <div className="flex items-start gap-4">
                <ArrowRight className="mt-1 text-primary" />
                <a
                  className="transition-colors hover:text-primary"
                  href={contact.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contact.website}
                </a>
              </div>
              <Separator className="bg-border/60" />
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-primary" />
                <div className="space-y-1 text-muted-foreground">
                  {contact.locations.map((location) => (
                    <p key={location}>{location}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
