import {Component} from 'react'
import Loader from 'react-loader-spinner'
import GlobalNavBar from '../GlobalNavBar'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const Constants = {
  initiate: 'INITIATE',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SingleMovie extends Component {
  state = {apiStatus: Constants.initiate, movieDetails: {}, castMembers: []}

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: 'INPROGRESS'})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const API_KEY = 'aeff40353c2c49825d558b2b3e97397e'

    const castResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    )

    const castData = await castResponse.json()
    console.log(castData)

    const newCastData = castData.cast.map(i => ({
      id: i.cast_id,
      name: i.name,
      profilePath: i.profile_path,
      character: i.character,
    }))
    console.log(newCastData)

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    )
    if (response.ok) {
      const data = await response.json()

      const newData = {
        title: data.title,
        posterPath: data.poster_path,
        voteAverage: data.vote_average,
        runtime: data.runtime,
        releaseDate: data.release_date,
        overview: data.overview,
        id: data.id,
        genres: data.genres[0].name,
      }
      this.setState({
        apiStatus: 'SUCCESS',
        movieDetails: newData,
        castMembers: newCastData,
      })
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  loaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="150" />
    </div>
  )

  successView = () => {
    const {movieDetails, castMembers} = this.state

    const {
      title,
      posterPath,
      voteAverage,
      runtime,
      releaseDate,
      overview,
      genres,
    } = movieDetails

    return (
      <div className="popularMoviesContainer">
        <h1>Movie details</h1>
        <div className="movieDetailsContainer">
          <img
            src={`https://image.tmdb.org/t/p/w300${posterPath}`}
            alt={title}
          />
          <div className="detailsContainer">
            <p>Name: {title}</p>
            <p>Ratings: {voteAverage}</p>
            <p>Duration: {runtime}</p>
            <p>Genre: {genres}</p>
            <p>Release date: {releaseDate}</p>
            <p>Overview: {overview}</p>
          </div>
        </div>
        <div>
          <h1>Cast Members</h1>
          <ul className="castContainer">
            {castMembers.map(i => (
              <li key={i.id} className="castIcon">
                <img
                  src={`https://image.tmdb.org/t/p/w200${i.profilePath}`}
                  alt={i.name}
                />
                <p>Original name: {i.name}</p>
                <p>Character name: {i.character}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  failureView = () => <h1>Failed to load Movie Details</h1>

  finalOutput = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'INPROGRESS':
        return this.loaderView()
      case 'SUCCESS':
        return this.successView()
      case 'FAILURE':
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <GlobalNavBar searchIn={this.searchIn} />
        {this.finalOutput()}
      </div>
    )
  }
}

export default SingleMovie
