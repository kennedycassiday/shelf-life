export default function Nav({ active, onSelect }) {
  const tabs = ['Map', 'Timeline', 'Explorer']

  return (
    <nav className="nav">
      <div className="nav-brand">
        <span className="nav-brand-mark">◆</span>
        <span className="nav-brand-text">SHELF LIFE</span>
      </div>
      <div className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`nav-tab ${active === tab ? 'nav-tab--active' : ''}`}
            onClick={() => onSelect(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  )
}
