import { COORDS, ALIASES } from '../data/locationCoords'

// ── Reason categories & colors ────────────────────────────────────────
export const CATEGORIES = {
  lgbtq:    { label: 'LGBTQ+ content',        color: '#c084fc' },
  sexual:   { label: 'Sexual / explicit',      color: '#fb7185' },
  racial:   { label: 'Racial content',         color: '#fb923c' },
  violence: { label: 'Violence / graphic',     color: '#f87171' },
  drug:     { label: 'Drug / alcohol use',     color: '#34d399' },
  religious:{ label: 'Religious objections',   color: '#60a5fa' },
  political:{ label: 'Political viewpoint',    color: '#a3e635' },
  language: { label: 'Language / profanity',   color: '#fbbf24' },
  other:    { label: 'Other',                  color: '#94a3b8' },
}

export function getCategory(reasons) {
  const r = reasons.join(' ').toLowerCase()
  if (r.includes('lgbtq') || r.includes('transgender') || r.includes('same-sex')) return 'lgbtq'
  if (r.includes('racial') || r.includes('racism') || r.includes('slur') || r.includes('race')) return 'racial'
  if (r.includes('drug') || r.includes('alcohol')) return 'drug'
  if (r.includes('religious') || r.includes('christian') || r.includes('occult')
    || r.includes('witchcraft') || r.includes('satan') || r.includes('wicca')
    || r.includes('evil spirits')) return 'religious'
  if (r.includes('political') || r.includes('socialist') || r.includes('communist')
    || r.includes('anti-police') || r.includes('social agenda')) return 'political'
  if (r.includes('violence') || r.includes('violent') || r.includes('graphic')
    || r.includes('abuse')) return 'violence'
  if (r.includes('sexual') || r.includes('explicit') || r.includes('rape')
    || r.includes('pornograph') || r.includes('masturbat') || r.includes('bdsm')
    || r.includes('trafficking')) return 'sexual'
  if (r.includes('language') || r.includes('profanity') || r.includes('offensive language')) return 'language'
  return 'other'
}

// ── Location parsing ──────────────────────────────────────────────────

// Strip parenthetical content, trailing punctuation, and common noise
function clean(s) {
  return s
    .replace(/\s*\([^)]*\)/g, '')   // remove (Eastern High School), (1966), etc.
    .replace(/\s*\[[^\]]*\]/g, '')
    .trim()
    .replace(/[,;]$/, '')
    .trim()
}

const SKIP_PATTERNS = [
  /multiple/i, /various/i, /nationwide/i, /across the/i,
  /state prison/i, /public librar/i, /college campus/i,
  /^texas$/i, /^florida$/i, /^california$/i, /^pennsylvania$/i,
  /^virginia$/i, /^alaska$/i, /^iowa$/i, /^tennessee$/i,
  /^north carolina$/i, /^idaho$/i, /^michigan$/i, /^missouri$/i,
]

function shouldSkip(s) {
  return SKIP_PATTERNS.some(p => p.test(s))
}

function lookupCoords(raw) {
  const s = clean(raw)

  // 1. Try the alias map first
  if (ALIASES[s]) return COORDS[ALIASES[s]] ?? null
  if (ALIASES[raw.trim()]) return COORDS[ALIASES[raw.trim()]] ?? null

  // 2. Direct lookup
  if (COORDS[s]) return COORDS[s]

  // 3. Strip common school-district suffixes and retry
  const stripped = s
    .replace(/\s+School District$/, '')
    .replace(/\s+Independent School District$/, '')
    .replace(/\s+ISD$/, '')
    .replace(/\s+Public Schools?$/, '')
    .replace(/\s+Schools?$/, '')
    .replace(/\s+Borough$/, '')
    .replace(/\s+Area$/, '')
    .trim()
  if (COORDS[stripped]) return COORDS[stripped]

  // 4. Try appending state abbreviation if present in original
  const stateMatch = s.match(/,\s*([A-Z]{2})$/)
  if (stateMatch) {
    const state = stateMatch[1]
    const city = s.slice(0, s.lastIndexOf(',')).trim()
    const key = `${city}, ${state}`
    if (COORDS[key]) return COORDS[key]
    // Try stripped city + state
    const strippedCity = city
      .replace(/\s+School District$/, '')
      .replace(/\s+ISD$/, '')
      .replace(/\s+Public Schools?$/, '')
      .trim()
    const strippedKey = `${strippedCity}, ${state}`
    if (COORDS[strippedKey]) return COORDS[strippedKey]
  }

  return null
}

// Seeded pseudo-random jitter so positions are stable across renders
function seededJitter(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return (x - Math.floor(x) - 0.5) * 0.45
}

// ── Main builder ──────────────────────────────────────────────────────
export function buildMapPoints(books) {
  const points = []
  const usedCoords = {}   // track occupancy for jitter

  books.forEach((book, bookIdx) => {
    const category = getCategory(book.reason_for_challenge)
    const { color } = CATEGORIES[category]

    // Split semicolon-separated locations
    const parts = book.location.split(';').map(p => p.trim())

    parts.forEach((part, partIdx) => {
      if (shouldSkip(part)) return

      const coords = lookupCoords(part)
      if (!coords) return

      // Stable jitter key based on book + part
      const jitterSeed = bookIdx * 100 + partIdx
      const key = `${Math.round(coords[0] * 10)}_${Math.round(coords[1] * 10)}`
      const occupancy = (usedCoords[key] || 0)
      usedCoords[key] = occupancy + 1

      const jitteredCoords = [
        coords[0] + seededJitter(jitterSeed),
        coords[1] + seededJitter(jitterSeed + 1),
      ]

      points.push({
        coords: jitteredCoords,
        locationName: clean(part),
        book,
        category,
        color,
      })
    })
  })

  return points
}
