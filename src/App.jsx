import { useState } from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import Map from './components/Map'
import Timeline from './components/Timeline'
import Explorer from './components/Explorer'

export default function App() {
  const [view, setView] = useState('Home')

  const renderView = () => {
    switch (view) {
      case 'Map': return <Map />
      case 'Timeline': return <Timeline />
      case 'Explorer': return <Explorer />
      default: return <Home onNavigate={setView} />
    }
  }

  return (
    <div className="app">
      <Nav active={view} onSelect={setView} />
      <div className="content">
        {renderView()}
      </div>
    </div>
  )
}
