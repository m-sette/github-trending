import './Repositories.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Repositories = () => {
  const [repos, setRepos] = useState([])
  const [lang, setLang] = useState('')

  async function fetchData() {
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=language:${lang}&sort=stars&order=desc`
      )
      setRepos(response.data.items)
    } catch (error) {
      console.log('Error', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const listRepos = repos.map((repo) => {
    return (
      <div className='card' key={repo.id}>
        <h2>
          <a href={repo.html_url} target='_blank' rel='noreferrer'>
            {repo.full_name}
          </a>
        </h2>
        <p>{repo.description}</p>
      </div>
    )
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className='search'
          type='text'
          onChange={(e) => setLang(e.target.value)}
          required
        ></input>
        <input className='button' type='submit' value='submit'></input>
      </form>

      {listRepos}
    </div>
  )
}

export default Repositories
