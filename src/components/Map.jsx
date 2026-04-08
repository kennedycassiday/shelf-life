import { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { books } from '../data/books'
import { buildMapPoints, CATEGORIES } from '../utils/mapUtils'

const points = buildMapPoints(books)

const CATEGORY_KEYS = Object.keys(CATEGORIES)

function ResetButton() {
  const map = useMap()
  return (
    <button
      className="map-reset-btn"
      onClick={() => map.setView([38, -96], 4)}
      title="Reset view"
    >
      ⊕
    </button>
  )
}

export default function Map() {
  const [activeCategory, setActiveCategory] = useState(null)

  const filtered = activeCategory
    ? points.filter(p => p.category === activeCategory)
    : points

  // Breakdown counts for the summary bar
  const counts = {}
  CATEGORY_KEYS.forEach(k => { counts[k] = points.filter(p => p.category === k).length })

  return (
    <div className="view map-view">
      <div className="view-header">
        <h2 className="view-title">Geographic Distribution</h2>
        <p className="view-subtitle">
          {points.length} documented challenge sites across the United States — click any point for details
        </p>
      </div>

      {/* Category filter pills */}
      <div className="map-filters">
        <button
          className={`map-filter-pill ${!activeCategory ? 'map-filter-pill--active' : ''}`}
          onClick={() => setActiveCategory(null)}
          style={{ '--pill-color': '#e8e8ed' }}
        >
          All ({points.length})
        </button>
        {CATEGORY_KEYS.map(key => {
          const { label, color } = CATEGORIES[key]
          return (
            <button
              key={key}
              className={`map-filter-pill ${activeCategory === key ? 'map-filter-pill--active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              style={{ '--pill-color': color }}
            >
              <span className="map-filter-dot" style={{ background: color }} />
              {label} ({counts[key]})
            </button>
          )
        })}
      </div>

      {/* Leaflet map */}
      <div className="map-leaflet-wrapper">
        <MapContainer
          center={[38, -96]}
          zoom={4}
          minZoom={3}
          maxZoom={12}
          className="leaflet-map"
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            subdomains="abcd"
            maxZoom={19}
          />

          <ResetButton />

          {filtered.map((pt, i) => (
            <CircleMarker
              key={i}
              center={pt.coords}
              radius={7}
              pathOptions={{
                color: pt.color,
                fillColor: pt.color,
                fillOpacity: 0.75,
                weight: 1.5,
              }}
            >
              <Popup className="map-popup-container" maxWidth={320}>
                <div className="map-popup">
                  <div
                    className="map-popup-category"
                    style={{ color: pt.color }}
                  >
                    {CATEGORIES[pt.category].label}
                  </div>

                  <div className="map-popup-title">{pt.book.title}</div>
                  <div className="map-popup-author">
                    {pt.book.author} &middot; {pt.book.year_published}
                  </div>

                  <div className="map-popup-location">
                    📍 {pt.locationName}
                  </div>

                  <div className="map-popup-section-label">Reasons cited</div>
                  <div className="map-popup-tags">
                    {pt.book.reason_for_challenge.map((r, j) => (
                      <span key={j} className="map-popup-tag">{r}</span>
                    ))}
                  </div>

                  <div className="map-popup-section-label">Outcome</div>
                  <div className="map-popup-outcome">{pt.book.outcome}</div>

                  <div className="map-popup-years">
                    Challenged: {pt.book.years_challenged.join(', ')}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Summary counts by category */}
      <div className="map-category-summary">
        {CATEGORY_KEYS.filter(k => counts[k] > 0).map(key => {
          const { label, color } = CATEGORIES[key]
          return (
            <button
              key={key}
              className={`map-summary-card ${activeCategory === key ? 'map-summary-card--active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              style={{ '--card-color': color }}
            >
              <div className="map-summary-swatch" style={{ background: color }} />
              <div className="map-summary-count">{counts[key]}</div>
              <div className="map-summary-label">{label}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
