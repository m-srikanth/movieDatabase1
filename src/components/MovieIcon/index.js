import {withRouter} from 'react-router-dom'
import './index.css'

const MovieIcon = props => {
  const {each} = props
  const {id, posterPath, title, voteAverage} = each

  const singleMovie = () => {
    const {history} = props
    history.push(`/movie/${id}`)
  }

  return (
    <li className="movieIcon">
      <img src={`https://image.tmdb.org/t/p/w300${posterPath}`} alt={title} />
      <h1 className="titleEdz">{title}</h1>
      <div className="movieIcon1">
        <p>Rating: {voteAverage}</p>
        <button type="button" className="btn" onClick={singleMovie}>
          View Details
        </button>
      </div>
    </li>
  )
}

export default withRouter(MovieIcon)
