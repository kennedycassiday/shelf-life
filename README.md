# Shelf Life — A Censorship Archive

A data visualization project documenting books by women authors that have been challenged, banned, or restricted in U.S. schools and libraries. Built as a dark, editorial-style React app with interactive mapping, timeline, and explorer views.

---

## Features

**Map** — Leaflet-powered map plotting each challenge as a geocoded point, color-coded by reason for challenge. Filter by category, click markers for full book details.

**Timeline** — Horizontal decade-based axis. Click any decade to expand a structured panel of challenged titles, organized by year with color-coded reason tags.

**Explorer** — Bar charts breaking down challenges by reason and by most-challenged author. Filterable, sortable, searchable table with expandable detail rows. Charts are interactive - clicking a bar filters the table.

---

## Data

The dataset (`banned_books_women_authors.json`) covers 45 titles drawn from:

- **American Library Association Office for Intellectual Freedom** — annual Top 10 Most Challenged Books lists (2001–2024)
- **PEN America Book Ban Index**
- Individual challenge records

Each entry documents: title, author, year published, years challenged, known locations, stated reasons, and outcome where recorded.

> Challenge data is incomplete by nature — the ALA estimates fewer than 20% of challenges are formally reported. This dataset represents documented cases only.

---

## Stack

- **React 18** + **Vite 5**
- **Leaflet / react-leaflet v4** — interactive map with CartoDB Dark Matter tiles
- Pure CSS with custom properties — no component library
- Static JSON dataset imported directly as a module

---

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## Project Structure

```
src/
  components/
    Home.jsx        # Landing page — hero, stats, about section
    Map.jsx         # Leaflet map with filter pills and popups
    Timeline.jsx    # Decade axis with expandable panels
    Explorer.jsx    # Bar charts + filterable book table
    Nav.jsx         # Sticky navigation
  data/
    books.js        # Imports and re-exports the JSON dataset
    locationCoords.js  # Coordinate lookup table + aliases for geocoding
  utils/
    mapUtils.js     # Shared category/color system, map point builder
banned_books_women_authors.json   # Primary dataset
```

---

## Sources

- [ALA Office for Intellectual Freedom](https://www.ala.org/advocacy/bbooks)
- [PEN America Book Ban Index](https://pen.org/book-bans/)
- [CMU Banned Books Project](https://www.cmu.edu/banned-books/)
