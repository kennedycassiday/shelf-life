export default function Nav({ active, onSelect }) {
  const tabs = ['Map', 'Timeline', 'Explorer']

  return (
    <nav className="nav">
      <button className="nav-brand" onClick={() => onSelect('Home')}>
        <span className="nav-brand-mark">◆</span>
        <span className="nav-brand-text">SHELF LIFE</span>
        <span className="nav-brand-sub">A Censorship Archive</span>
      </button>

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

      <div className="nav-end">
        <span className="nav-end-text">Books by women authors</span>
      </div>
    </nav>
  )
}
