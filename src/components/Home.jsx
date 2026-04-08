import { books } from '../data/books'

const STAT_ITEMS = [
  { value: books.length,                                                        label: 'Titles documented' },
  { value: [...new Set(books.map(b => b.author))].length,                      label: 'Women authors' },
  { value: Math.min(...books.map(b => Math.min(...b.years_challenged))),        label: 'Earliest challenge' },
  { value: [...new Set(books.flatMap(b => b.reason_for_challenge))].length,    label: 'Distinct reasons cited' },
]

export default function Home({ onNavigate }) {
  return (
    <main className="home">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-eyebrow">A Censorship Archive</div>
            <h1 className="hero-title">
              Shelf<br />
              <em className="hero-title-accent">Life</em>
            </h1>
            <p className="hero-body">
              Documenting books by women authors that have been challenged,
              banned, or restricted in U.S. schools and libraries — tracking
              where, when, and why.
            </p>
            <div className="hero-actions">
              <button className="btn btn--primary" onClick={() => onNavigate('Explorer')}>
                Browse the Archive
              </button>
              <button className="btn btn--ghost" onClick={() => onNavigate('Timeline')}>
                View Timeline
              </button>
            </div>
          </div>

          <div className="hero-pull">
            <div className="hero-pull-mark">&ldquo;</div>
            <blockquote className="hero-quote">
              We will need writers who can remember freedom — poets, visionaries —
              the realists of a larger reality.
            </blockquote>
            <cite className="hero-cite">— Ursula K. Le Guin, National Book Awards, 2014</cite>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <section className="stats">
        {STAT_ITEMS.map(({ value, label }) => (
          <div key={label} className="stat">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </section>

      {/* ── Nav cards ────────────────────────────────── */}
      <section className="home-nav-cards">
        {[
          {
            id: 'Map',
            icon: '⬡',
            title: 'Map',
            desc: 'See the geographic spread of book challenges and bans across U.S. states.',
          },
          {
            id: 'Timeline',
            icon: '◌',
            title: 'Timeline',
            desc: 'Trace the history of censorship decade by decade, from 1966 to the present.',
          },
          {
            id: 'Explorer',
            icon: '◈',
            title: 'Explorer',
            desc: 'Search, filter, and browse all documented titles with full challenge records.',
          },
        ].map(card => (
          <button key={card.id} className="home-nav-card" onClick={() => onNavigate(card.id)}>
            <div className="home-nav-card-icon">{card.icon}</div>
            <div className="home-nav-card-title">{card.title}</div>
            <p className="home-nav-card-desc">{card.desc}</p>
            <div className="home-nav-card-arrow">→</div>
          </button>
        ))}
      </section>

      {/* ── About ────────────────────────────────────── */}
      <section className="about">
        <div className="about-inner">
          <div className="about-header">
            <div className="about-rule" />
            <h2 className="about-title">About this project</h2>
            <div className="about-rule" />
          </div>

          <div className="about-body">
            <div className="about-col">
              <h3 className="about-col-heading">Why it matters</h3>
              <p>
                Book challenges and bans have surged dramatically in the United States
                since 2021. Women authors — particularly those writing about race,
                identity, sexuality, and trauma — are disproportionately targeted.
                Between 2021 and 2023, PEN America documented over 5,000 individual
                book bans across 41 states, with women and non-binary authors
                representing the majority of those affected.
              </p>
              <p>
                This archive makes that pattern visible: who is being silenced, where
                it is happening, and what reasons are given.
              </p>
            </div>

            <div className="about-col">
              <h3 className="about-col-heading">Methodology</h3>
              <p>
                Data is drawn from the{' '}
                <strong>American Library Association Office for Intellectual Freedom</strong>
                {' '}annual Top&nbsp;10 Most Challenged Books lists (2001–2024), the{' '}
                <strong>PEN America Book Ban Index</strong>, and individual challenge
                records. Each entry documents the title, author, years challenged,
                known locations, stated reasons, and outcome where recorded.
              </p>
              <p>
                Challenge data is incomplete by nature — the ALA estimates that fewer
                than 20% of challenges are formally reported. This dataset represents
                documented cases only.
              </p>
            </div>

            <div className="about-col">
              <h3 className="about-col-heading">Scope</h3>
              <p>
                This project focuses on books authored by women as defined at the
                time of publication or by the author's own identification. The dataset
                covers challenges and bans primarily in U.S. public schools and
                libraries, with some international cases noted where significant.
              </p>
              <p>
                Entries are updated as new data becomes available. If you have
                corrections or additions, the underlying dataset is available in the
                project repository.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="home-footer">
        <div className="home-footer-sources">
          <span className="home-footer-label">Sources</span>
          <span>American Library Association Office for Intellectual Freedom</span>
          <span className="home-footer-sep">·</span>
          <span>PEN America Book Ban Index</span>
          <span className="home-footer-sep">·</span>
          <span>CMU Banned Books Project</span>
        </div>
      </footer>

    </main>
  )
}
