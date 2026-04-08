import { useState, useMemo } from 'react'
import { books } from '../data/books'

const ALL_REASONS = [...new Set(books.flatMap(b => b.reason_for_challenge))].sort()

export default function Explorer() {
  const [query, setQuery] = useState('')
  const [filterReason, setFilterReason] = useState('')
  const [sortBy, setSortBy] = useState('year_published')
  const [expanded, setExpanded] = useState(null)

  const filtered = useMemo(() => {
    let result = books
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q)
      )
    }
    if (filterReason) {
      result = result.filter(b => b.reason_for_challenge.includes(filterReason))
    }
    return [...result].sort((a, b) => {
      if (sortBy === 'year_published') return a.year_published - b.year_published
      if (sortBy === 'author') return a.author.localeCompare(b.author)
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'challenges') return b.years_challenged.length - a.years_challenged.length
      return 0
    })
  }, [query, filterReason, sortBy])

  return (
    <div className="view explorer-view">
      <div className="view-header">
        <h2 className="view-title">Book Explorer</h2>
        <p className="view-subtitle">{filtered.length} of {books.length} titles</p>
      </div>

      <div className="explorer-controls">
        <input
          className="explorer-search"
          type="text"
          placeholder="Search by title, author, or location…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <select
          className="explorer-select"
          value={filterReason}
          onChange={e => setFilterReason(e.target.value)}
        >
          <option value="">All reasons</option>
          {ALL_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select
          className="explorer-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="year_published">Sort: Year published</option>
          <option value="author">Sort: Author</option>
          <option value="title">Sort: Title</option>
          <option value="challenges">Sort: Most challenged</option>
        </select>
      </div>

      <div className="explorer-grid">
        {filtered.map((book, i) => (
          <div
            key={i}
            className={`explorer-card ${expanded === i ? 'explorer-card--expanded' : ''}`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <div className="explorer-card-top">
              <div className="explorer-card-year">{book.year_published}</div>
              <div className="explorer-card-title">{book.title}</div>
              <div className="explorer-card-author">{book.author}</div>
              <div className="explorer-card-challenges">
                <span className="challenge-count">{book.years_challenged.length}</span>
                <span className="challenge-label"> challenge year{book.years_challenged.length !== 1 ? 's' : ''}</span>
              </div>
            </div>

            {expanded === i && (
              <div className="explorer-card-detail">
                <div className="detail-row">
                  <span className="detail-label">Years challenged</span>
                  <span className="detail-value">{book.years_challenged.join(', ')}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{book.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Outcome</span>
                  <span className="detail-value">{book.outcome}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Reasons</span>
                  <div className="detail-tags">
                    {book.reason_for_challenge.map((r, j) => (
                      <span key={j} className="tag">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="explorer-empty">No books match your search.</div>
      )}
    </div>
  )
}
