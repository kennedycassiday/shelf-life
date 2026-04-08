import { books } from '../data/books'

const STAT_ITEMS = [
  { value: books.length, label: 'Books documented' },
  { value: [...new Set(books.map(b => b.author))].length, label: 'Women authors' },
  {
    value: Math.min(...books.map(b => Math.min(...b.years_challenged))),
    label: 'Earliest challenge'
  },
  {
    value: [...new Set(books.flatMap(b => b.reason_for_challenge))].length,
    label: 'Distinct reasons cited'
  },
]

export default function Home({ onNavigate }) {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-eyebrow">A Censorship Archive</div>
        <h1 className="hero-title">
          Shelf<br />
          <span className="hero-title-accent">Life</span>
        </h1>
        <p className="hero-body">
          Documenting books by women authors that have been challenged, banned, or
          restricted in U.S. schools and libraries — tracking where, when, and why.
        </p>
        <div className="hero-actions">
          <button className="btn btn--primary" onClick={() => onNavigate('Explorer')}>
            Browse the Archive
          </button>
          <button className="btn btn--ghost" onClick={() => onNavigate('Timeline')}>
            View Timeline
          </button>
        </div>
      </section>

      <section className="stats">
        {STAT_ITEMS.map(({ value, label }) => (
          <div key={label} className="stat">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </section>

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
            desc: 'Trace the history of censorship from 1966 to the present day.',
          },
          {
            id: 'Explorer',
            icon: '◈',
            title: 'Explorer',
            desc: 'Search, filter, and browse all 46 documented titles and their full records.',
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

      <section className="home-source">
        <p>
          Data sourced from the{' '}
          <strong>American Library Association Office for Intellectual Freedom</strong>{' '}
          annual Top 10 Most Challenged Books lists (2001–2024) and{' '}
          <strong>PEN America Book Ban Index</strong>.
        </p>
      </section>
    </main>
  )
}
