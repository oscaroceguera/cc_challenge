import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import CircularProgress from '@material-ui/core/CircularProgress'

const App = Loadable({
  loader: () => import('./containers/App'),
  loading: () => <div style={{ textAlign: 'center' }}><CircularProgress /></div>
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
)