import './App.css'
import Pages from './pages'
import Home from './pages/home/Home'

function App() {

  return (
    <div style={{display: 'flex', maxWidth: '100vw'}}>
      <Home/>
      <div style={{flex: 1, marginTop: '40px', padding: '0 80px'}}>
        <Pages/>
      </div>
    </div>
  )
}

export default App
