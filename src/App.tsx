import NeuralNetwork from './components/NeuralNetwork'
import './App.css'

function App() {
  return (
    <>
      <NeuralNetwork />
      <div className="hud">
        <header>
          <h1>MAYOKA INC.</h1>
          <div className="status-bar">
            <span>SYS_STABILITY: <span className="neon">NOMINAL</span></span>
            <span>AGENT_COHESION: <span className="neon">99.8%</span></span>
          </div>
        </header>

        <main className="content">
          <section className="hero">
            <h2 className="glitch" data-text="CORTEX ENGINE">CORTEX ENGINE</h2>
            <p className="subtitle">Orchestrating Autonomous Intelligence.</p>
          </section>

          <div className="data-grid">
            <div className="data-card">
              <h3>NODE_TRAFFIC</h3>
              <div className="value">4.2 PB/s</div>
            </div>
            <div className="data-card">
              <h3>SYNAPSE_LOAD</h3>
              <div className="value">12.4%</div>
            </div>
          </div>
        </main>

        <footer>
          <div className="location">LOC: NEON_SECTOR_01</div>
          <div className="time">TIME: {new Date().toLocaleTimeString()}</div>
        </footer>
      </div>
    </>
  )
}

export default App
