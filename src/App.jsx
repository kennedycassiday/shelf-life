import { useState, useEffect, useRef } from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import Map from './components/Map'
import Timeline from './components/Timeline'
import Explorer from './components/Explorer'

export default function App() {
  const [view, setView] = useState('Home')
  const [animKey, setAnimKey] = useState(0)
  const prevView = useRef('Home')

  const navigate = (next) => {
    if (next === view) return
    prevView.current = view
    setView(next)
    setAnimKey(k => k + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderView = () => {
    switch (view) {
      case 'Map':      return <Map />
      case 'Timeline': return <Timeline />
      case 'Explorer': return <Explorer />
      default:         return <Home onNavigate={navigate} />
    }
  }

  return (
    <div className="app">
      <Nav active={view} onSelect={navigate} />
      <div className="content" key={animKey}>
        {renderView()}
      </div>
    </div>
  )
}
