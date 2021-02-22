import './App.css'
import Repositories from './components/Repositories'

const App = () => {
  return (
    <main>
      <h1 className='title'>Trending repositories of the week</h1>
      <Repositories />
    </main>
  )
}

export default App
