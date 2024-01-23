import {Switch, Route} from 'react-router-dom'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import UpComing from './components/UpComing'
import SingleMovie from './components/SingleMovie'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Popular} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={UpComing} />
    <Route exact path="/movie/:id" component={SingleMovie} />
  </Switch>
)

export default App
