import { useState, useMemo } from 'react'
import { books } from '../data/books'
import { CATEGORIES, getCategory } from '../utils/mapUtils'

// ── Pre-computed stats ────────────────────────────────────────────────

const reasonCounts = (() => {
  const counts = {}
  books.forEach(b => {
    const cat = getCategory(b.reason_for_challenge)
    counts[cat] = (counts[cat] || 0) + 1
  })
  return Object.entries(counts)
    .map(([key, count]) => ({ key, count, ...CATEGORIES[key] }))
    .sort((a, b) => b.count - a.count)
})()

const authorCounts = (() => {
  const counts = {}
  books.forEach(b => {
    counts[b.author] = (counts[b.author] || 0) + b.years_challenged.length
  })
  return Object.entries(counts)
    .map(([author, count]) => ({ author, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})()

const maxReasonCount = Math.max(...reasonCounts.map(r => r.count))
const maxAuthorCount = Math.max(...authorCounts.map(a => a.count))

const ALL_REASONS = [...new Set(books.flatMap(b => b.reason_for_challenge))].sort()

// ── Sub-components ────────────────────────────────────────────────────

function BarChart({ title, rows, maxVal, colorFn, labelKey, onBarClick, activeKey }) {
  return (
    <div className="ex-chart">
      <div className="ex-chart-title">{title}</div>
      <div className="ex-chart-rows">
        {rows.map((row, i) => {
          const pct = (row.count / maxVal) * 100
          const key = row[labelKey]
          const isActive = activeKey === key
          return (
            <button
              key={i}
              className={`ex-chart-row ${isActive ? 'ex-chart-row--active' : ''}`}
              onClick={() => onBarClick(isActive ? null : key)}
            >
              <div className="ex-chart-row-label">{key}</div>
              <div className="ex-chart-bar-wrap">
                <div
                  className="ex-chart-bar"
                  style={{ width: `${pct}%`, background: colorFn(row) }}
                />
              </div>
              <div className="ex-chart-row-count">{row.count}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────

export default function Explorer() {
  const [query, setQuery]             = useState('')
  const [filterCategory, setFilterCategory] = useState(null)
  const [filterAuthor, setFilterAuthor]     = useState(null)
  const [sortBy, setSortBy]           = useState('year_published')
  const [expanded, setExpanded]       = useState(null)

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
    if (filterCategory) {
      result = result.filter(b => getCategory(b.reason_for_challenge) === filterCategory)
    }
    if (filterAuthor) {
      result = result.filter(b => b.author === filterAuthor)
    }

    return [...result].sort((a, b) => {
      if (sortBy === 'year_published') return a.year_published - b.year_published
      if (sortBy === 'author')         return a.author.localeCompare(b.author)
      if (sortBy === 'title')          return a.title.localeCompare(b.title)
      if (sortBy === 'challenges')     return b.years_challenged.length - a.years_challenged.length
      return 0
    })
  }, [query, filterCategory, filterAuthor, sortBy])

  const hasFilter = filterCategory || filterAuthor || query.trim()

  const clearFilters = () => {
    setQuery('')
    setFilterCategory(null)
    setFilterAuthor(null)
  }

  return (
    <div className="view explorer-view">
      <div className="view-header">
        <h2 className="view-title">Book Explorer</h2>
        <p className="view-subtitle">
          {filtered.length} of {books.length} titles
          {hasFilter && (
            <button className="ex-clear-btn" onClick={clearFilters}>
              × clear filters
            </button>
          )}
        </p>
      </div>

      {/* ── Charts row ── */}
      <div className="ex-charts-row">
        <BarChart
          title="Challenges by reason"
          rows={reasonCounts}
          maxVal={maxReasonCount}
          labelKey="key"
          colorFn={row => row.color}
          onBarClick={key => { setFilterCategory(key); setExpanded(null) }}
          activeKey={filterCategory}
        />
        <BarChart
          title="Top challenged authors"
          rows={authorCounts}
          maxVal={maxAuthorCount}
          labelKey="author"
          colorFn={() => 'var(--accent-2)'}
          onBarClick={author => { setFilterAuthor(author); setExpanded(null) }}
          activeKey={filterAuthor}
        />
      </div>

      {/* ── Search & sort controls ── */}
      <div className="explorer-controls">
        <input
          className="explorer-search"
          type="text"
          placeholder="Search by title, author, or location…"
          value={query}
          onChange={e => { setQuery(e.target.value); setExpanded(null) }}
        />
        <select
          className="explorer-select"
          value={filterCategory || ''}
          onChange={e => { setFilterCategory(e.target.value || null); setExpanded(null) }}
        >
          <option value="">All reason categories</option>
          {Object.entries(CATEGORIES).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
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

      {/* ── Book table ── */}
      <div className="ex-table">
        <div className="ex-table-head">
          <div className="ex-col-year">Year</div>
          <div className="ex-col-title">Title</div>
          <div className="ex-col-author">Author</div>
          <div className="ex-col-category">Category</div>
          <div className="ex-col-count">Challenges</div>
        </div>

        {filtered.map((book, i) => {
          const cat = getCategory(book.reason_for_challenge)
          const { color, label } = CATEGORIES[cat]
          const isExpanded = expanded === i

          return (
            <div key={i} className={`ex-row ${isExpanded ? 'ex-row--open' : ''}`}>
              <button
                className="ex-row-main"
                onClick={() => setExpanded(isExpanded ? null : i)}
              >
                <div className="ex-col-year">{book.year_published}</div>
                <div className="ex-col-title">{book.title}</div>
                <div className="ex-col-author">{book.author}</div>
                <div className="ex-col-category">
                  <span className="ex-cat-dot" style={{ background: color }} />
                  <span className="ex-cat-label">{label}</span>
                </div>
                <div className="ex-col-count">
                  <span className="ex-count-num">{book.years_challenged.length}</span>
                  <span className="ex-count-suffix"> yr{book.years_challenged.length !== 1 ? 's' : ''}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="ex-row-detail">
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
                        <span key={j} className="tag" style={{ borderColor: `${color}50`, color }}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="explorer-empty">No books match your filters.</div>
        )}
      </div>
    </div>
  )
}
