import {Link} from 'react-router-dom'

import {Component} from 'react'

import './index.css'

class GlobalNavBar extends Component {
  state = {val: ''}

  upSearch = event => {
    this.setState({val: event.target.value})
  }

  changeVal = () => {
    const {val} = this.state
    const {searchIn} = this.props
    searchIn(val)
    this.setState({val: ''})
  }

  render() {
    const {val} = this.state

    return (
      <nav className="nav1">
        <h1>movieDB</h1>
        <div className="search">
          <input type="search" onChange={this.upSearch} value={val} />
          <button type="button" className="btn1" onClick={this.changeVal}>
            Search
          </button>
        </div>
        <ul className="ul1">
          <Link to="/" className="Link1">
            <li>Popular</li>
          </Link>
          <Link to="/top-rated" className="Link1">
            <li>Top Rated</li>
          </Link>
          <Link to="/upcoming" className="Link1">
            <li>Upcoming</li>
          </Link>
        </ul>
      </nav>
    )
  }
}

export default GlobalNavBar
