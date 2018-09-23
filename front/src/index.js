import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'

const App = Loadable({
  loader: () => import('./containers/App'),
  loading: () => <div style={{ textAlign: 'center' }}>CARGANDO...</div>
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
)