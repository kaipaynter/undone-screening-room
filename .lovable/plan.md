## UNDONE pitch site plan

### What I’ll build

1. **Public pitch site**
   - Replace the placeholder homepage with a cinematic single-route pitch experience for **UNDONE**.
   - Use the uploaded materials and Canva copy to build: title, key art, logline, trailer calls-to-action, audience/why-it-matters section, creator/team section, and contact section.
   - Keep the visual direction consistent with the source deck: black + warm gold + white, high-contrast type, film-pitch presentation feel.

2. **Invite-only auth flow**
   - Add a public `/auth` page with sign-in/sign-up for invited viewers.
   - Support basic profiles already backed by the existing database table, with signup creating pending users by default.
   - Surface clear status messaging for pending/revoked/approved access.

3. **Protected library for approved users**
   - Add an authenticated library area for:
     - Episode 1
     - Pitch deck
     - One-sheet
     - Series bible
     - Pilot script
   - Since this round is “structure first,” I’ll build the full gated UI with placeholder states and upload-ready slots instead of wiring final media now.

4. **Public vs protected content split**
   - Public visitors can see:
     - logline
     - key art / imagery
     - trailers section
     - audience/why UNDONE copy
     - creator/team bios
     - contact
   - Approved users can additionally access:
     - Episode 1
     - protected download area for documents

5. **Content-protection approach**
   - Prepare the protected media/documents area to use private backend storage and approval-based access.
   - Hide obvious native download affordances for protected video playback when final media is added.
   - Preserve the practical limitation note: no web solution can fully prevent determined recording or capture.

### Content I’ll use from your materials

- The uploaded slides to shape:
  - series bible / episode progression
  - audience positioning
  - creative leadership
  - production team
  - “why UNDONE?” framing
  - contact details
- The public site will feature the **full team** section and the **live contact details from the materials**.

### Technical details

- **Routes**
  - `/` public pitch site
  - `/auth` sign-in / access-request page
  - protected authenticated route(s) for the library
- **SEO**
  - Replace default metadata with UNDONE-specific title/description/open-graph tags.
  - Keep the public route crawlable; protected library stays gated.
- **Auth/data**
  - Reuse the existing backend auth/profile setup already created.
  - Keep invite-only logic centered on profile approval status.
- **UI structure**
  - Create reusable sections/components for hero, media calls-to-action, bios/team, and protected library cards.
- **Assets**
  - Use the uploaded imagery as site assets where appropriate, rather than just as references, for the pitch presentation sections.

### Deliverable for this implementation pass

A polished first version of the UNDONE site with the public pitch experience complete, the invite-only auth flow in place, and the protected library fully structured for later media/document uploads.
