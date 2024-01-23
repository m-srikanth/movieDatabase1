import {Component} from 'react'
import Loader from 'react-loader-spinner'
import GlobalNavBar from '../GlobalNavBar'

import MovieIcon from '../MovieIcon'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const Constants = {
  initiate: 'INITIATE',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {
    searchVal: '',
    apiStatus: Constants.initiate,
    popularMoviesList: [],
    searchedResults: [],
  }

  componentDidMount = () => {
    this.getData()
  }

  searchIn = value => {
    this.setState({searchVal: value}, this.getData)
  }

  getData = async () => {
    const {searchVal} = this.state
    this.setState({apiStatus: 'INPROGRESS'})

    const MOVIE_NAME = searchVal

    const API_KEY = 'aeff40353c2c49825d558b2b3e97397e'

    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=1`,
    )
    const searchData = await searchResponse.json()

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    )
    if (response.ok) {
      const data = await response.json()
      const newData = data.results.map(i => ({
        id: i.id,
        posterPath: i.poster_path,
        title: i.title,
        voteAverage: i.vote_average,
      }))
      const newSearchData = searchData.results.map(i => ({
        id: i.id,
        posterPath: i.poster_path,
        title: i.title,
        voteAverage: i.vote_average,
      }))
      this.setState({
        apiStatus: 'SUCCESS',
        popularMoviesList: newData,
        searchedResults: newSearchData,
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
    const {popularMoviesList, searchedResults} = this.state

    const a = searchedResults.length === 0 ? popularMoviesList : searchedResults

    return (
      <div className="popularMoviesContainer">
        <h1>Popular</h1>
        <ul className="moviesList">
          {a.map(i => (
            <MovieIcon each={i} key={i.id} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => <h1>Failed to load Popular Page</h1>

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

export default Popular
