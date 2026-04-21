

## Events Management System

Build a full events system with admin CRUD, real-time sync to public site, dedicated `/events` page, and featured events on the homepage. Uses Lovable Cloud for storage so changes persist and appear instantly across all visitors.

### What you'll get

**Public site**
- Homepage gets a new "Featured Events" section showing the top 3 active events as colorful tiles
- New `/events` page showing all active events in a colorful tile grid
- Inactive events are hidden from public view automatically
- Header nav link to `/events`

**Admin tab (`/admin`)**
- Open access (no login) — anyone with the URL can manage
- Table/grid of all events (active + inactive) with quick toggles
- "Add Event" button opens a dialog with fields:
  - Name (text)
  - Emoji (text, single emoji)
  - Description (textarea)
  - Team size (e.g. "2–4 players")
  - Color theme (picker with ~8 preset gradients: red, orange, amber, green, teal, blue, purple, pink)
  - Featured (checkbox — controls homepage visibility)
- Edit any event (same dialog, pre-filled)
- Toggle active/inactive with a switch directly in the row
- Delete with confirmation dialog
- Toast notifications for every action

**Seed data** — 5 sample events on first launch:
1. 🎯 Trivia Night — 2–6 players — purple
2. 🎨 Art Jam — 4–8 players — pink
3. 🏃 Field Day — 8–20 players — green
4. 🍕 Pizza & Code — 3–10 players — orange
5. 🎲 Board Game Marathon — 2–8 players — blue

### Tile design (colorful tiles)

Each tile uses its color theme as a gradient background, large emoji top-left, name in bold white, description below, and team size as a translucent pill badge. Cards have soft shadow, rounded corners, and a subtle hover lift.

```text
┌──────────────────────────┐
│ 🎯                       │  ← gradient bg (color theme)
│                          │
│  Trivia Night            │  ← bold white text
│  Test your knowledge…    │
│                          │
│  ◉ 2–6 players           │  ← pill badge
└──────────────────────────┘
```

### Technical details

- **Backend**: Lovable Cloud (Supabase). One `events` table with columns: `id`, `name`, `emoji`, `description`, `team_size`, `color_theme`, `is_active`, `is_featured`, `sort_order`, `created_at`, `updated_at`. RLS policies allow public SELECT of active events, and public ALL for admin (since access is open per your choice).
- **Real-time**: Supabase Realtime subscription on the `events` table so public pages update instantly when admin edits.
- **Routing**: Add `/events` and `/admin` routes in `App.tsx`.
- **New files**:
  - `src/pages/Events.tsx` — public events page
  - `src/pages/Admin.tsx` — admin tab
  - `src/components/EventTile.tsx` — colorful tile
  - `src/components/EventForm.tsx` — add/edit dialog
  - `src/components/FeaturedEvents.tsx` — homepage section
  - `src/hooks/useEvents.ts` — fetch + realtime subscription
  - `src/lib/colorThemes.ts` — gradient presets
- **Migration** to create table + seed 5 events.
- **Note on open admin access**: anyone who finds `/admin` can edit/delete. You can add password protection later if needed.

