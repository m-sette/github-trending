import './App.css'
import { useEffect, useState } from 'react'

import axios from 'axios'

const App = () => {
  const [repos, setRepos] = useState([])
  const [lang, setLang] = useState('')

  async function fetchData() {
    const res = await axios
      .get(
        `https://api.github.com/search/repositories?q=language:${lang}&sort=stars&order=desc`
      )
      .then((response) => {
        setRepos(response.data.items)
      })
      .catch((e) => console.log('Error', e))
  }

  useEffect(() => {
    fetchData()
  }, [])

  let listRepos = repos.map((repo) => {
    return (
      <div className='card' key={repo.id}>
        <h2>{repo.full_name}</h2>
        <p>{repo.description}</p>
      </div>
    )
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }

  return (
    <main>
      <h1>Trending repositories of the week</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={(e) => setLang(e.target.value)}
          required
        ></input>
        <input type='submit' value='submit'></input>
      </form>

      {listRepos}
    </main>
  )
}

export default App
