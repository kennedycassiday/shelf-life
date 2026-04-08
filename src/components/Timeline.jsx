import { useState } from 'react'
import { books } from '../data/books'
import { CATEGORIES, getCategory } from '../utils/mapUtils'

function buildDecades() {
  const decadeMap = {}
  books.forEach(book => {
    book.years_challenged.forEach(year => {
      const decade = Math.floor(year / 10) * 10
      if (!decadeMap[decade]) decadeMap[decade] = { decade, years: {}, totalEvents: 0 }
      if (!decadeMap[decade].years[year]) decadeMap[decade].years[year] = []
      decadeMap[decade].years[year].push(book)
      decadeMap[decade].totalEvents++
    })
  })
  return Object.values(decadeMap).sort((a, b) => a.decade - b.decade)
}

const decades = buildDecades()
const totalEvents = decades.reduce((s, d) => s + d.totalEvents, 0)
const maxEvents = Math.max(...decades.map(d => d.totalEvents))
const minYear = Math.min(...decades.map(d => d.decade))
const maxYear = Math.max(...decades.map(d => d.decade)) + 9

export default function Timeline() {
  const [openDecade, setOpenDecade] = useState(null)

  const toggle = (decade) => setOpenDecade(openDecade === decade ? null : decade)

  const openData = openDecade !== null ? decades.find(d => d.decade === openDecade) : null

  return (
    <div className="view timeline-view">
      <div className="view-header">
        <h2 className="view-title">Timeline of Challenges</h2>
        <p className="view-subtitle">
          {totalEvents} documented challenge events · {minYear}–{maxYear} · click a decade to expand
        </p>
      </div>

      {/* Horizontal timeline axis with circles */}
      <div className="tl-axis-wrap">
        <div className="tl-line" />
        <div className="tl-nodes">
          {decades.map(d => {
            const isActive = openDecade === d.decade
            const radius = 7 + (d.totalEvents / maxEvents) * 21
            return (
              <button
                key={d.decade}
                className={`tl-node ${isActive ? 'tl-node--active' : ''}`}
                onClick={() => toggle(d.decade)}
                title={`${d.decade}s: ${d.totalEvents} challenges`}
              >
                <span className="tl-node-label">{d.decade}s</span>
                <div className="tl-node-dot-wrap">
                  <div
                    className="tl-node-ring"
                    style={{ width: radius * 2 + 14, height: radius * 2 + 14 }}
                  />
                  <div
                    className="tl-node-dot"
                    style={{ width: radius * 2, height: radius * 2 }}
                  />
                </div>
                <span className="tl-node-count">{d.totalEvents}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Expanded panel */}
      {openData && (
        <div className="tl-panel">
          <div className="tl-panel-header">
            <span className="tl-panel-decade">{openData.decade}s</span>
            <span className="tl-panel-meta">
              {openData.totalEvents} challenge event{openData.totalEvents !== 1 ? 's' : ''} ·{' '}
              {Object.keys(openData.years).length} year{Object.keys(openData.years).length !== 1 ? 's' : ''}
            </span>
            <button className="tl-panel-close" onClick={() => setOpenDecade(null)}>✕</button>
          </div>

          <div className="tl-panel-body">
            {Object.entries(openData.years)
              .sort(([a], [b]) => a - b)
              .map(([year, bks]) => (
                <div key={year} className="tl-year-section">
                  <div className="tl-year-label">{year}</div>
                  <div className="tl-year-books">
                    {bks.map((book, i) => {
                      const cat = getCategory(book.reason_for_challenge)
                      const color = CATEGORIES[cat].color
                      return (
                        <div key={i} className="tl-book-card" style={{ borderLeftColor: color }}>
                          <div className="tl-book-title">{book.title}</div>
                          <div className="tl-book-author">{book.author}</div>
                          <div className="tl-book-tags">
                            {book.reason_for_challenge.slice(0, 2).map((r, j) => (
                              <span
                                key={j}
                                className="tl-book-tag"
                                style={{ color, borderColor: `${color}50` }}
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {!openDecade && (
        <p className="tl-hint">Click a circle to see books challenged that decade</p>
      )}
    </div>
  )
}
