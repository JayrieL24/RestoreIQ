# Service page image prompts

Images for the three signature sections on the service pages. Save each one at
the exact path listed — the page code references these filenames.

---

## Rules that apply to every prompt

Paste this block at the end of **every** prompt. The goal is a photo that looks
like it came off a technician's phone on an actual job, not a stock render.

```
Shot on a phone camera by a working technician, not a professional photographer.
Realistic domestic interior, ordinary and slightly worn. Overcast or plain
indoor lighting — no sun flare, no golden hour, no god rays, no rim lighting.
Surfaces should look used: scuffed baseboards, minor wear on paint, dust,
ordinary skirting, normal consumer-grade fixtures. Slightly imperfect framing,
natural depth of field, mild sensor noise. Muted, slightly flat colour — not
saturated or graded. No lens flare, no bokeh balls, no glossy reflective floors,
no pristine showroom surfaces, no dramatic shadows, no cinematic colour grade.
No people's faces in focus. No text, no watermarks, no logos. 4:3 landscape.
```

**Avoid:** anything that reads as a render — mirror-finish floors, perfectly
even lighting, impossibly clean rooms, over-sharpened edges, symmetrical
compositions, or the plasticky skin and hands typical of generated images.

---

## 1. Water damage — drying progress

**Path:** `public/services/features/drying-progress.jpg`

```
A pinless moisture meter held against the bottom of a painted baseboard in an
ordinary living room. The carpet nearby is visibly dark with water. A yellow
air mover sits on the floor a few feet away, angled at the wall. The room is
partly emptied, with a sofa pushed aside. Plain overcast daylight through a
window, no direct sun.
```

**Why this shot:** the section's argument is that drying ends on readings, not
on days. The meter against the wall is the literal act being described.

---

## 2. Fire & smoke — residue by material

**Path:** `public/services/features/smoke-residue.jpg`

```
A close three-quarter view of a kitchen cabinet door and the wall beside it,
both carrying a visible grey-brown smoke film. A gloved hand holds a dry
chemical sponge and has wiped one clean stripe through the residue, showing the
original paint colour underneath against the soiled surface. Ordinary kitchen,
dim indoor light, no window glare.
```

**Why this shot:** the clean stripe shows the before/after in a single frame and
makes the "method is chosen per material" point visible.

---

## 3. Sewage — water categories

**Path:** `public/services/features/containment.jpg`

```
A doorway sealed with plastic sheeting and tape forming a containment barrier,
viewed from the clean side of a residential hallway. A zipper runs down the
sheeting. On the floor just outside, a wet-vac hose and a roll of tape. The
floor on the near side is dry and ordinary. Plain indoor ceiling light, no
dramatic lighting.
```

**Why this shot:** containment is what a Category 3 loss actually looks like on
site, and it avoids depicting sewage itself — which would be both unpleasant
and hard to generate convincingly.

---

## Optional: one spare per section

If you want alternates, these work with the same rules block:

- **Water:** a thermal camera screen showing a cool patch spreading up a wall,
  held in frame against the actual wall.
- **Fire:** a ceiling-mounted HVAC return vent with grey particulate staining
  fanned out across the ceiling paint around it.
- **Sewage:** a stack of removed, bagged carpet pad sections by a doorway, with
  the bare subfloor visible behind.
