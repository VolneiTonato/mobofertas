import React from 'react'
import { Provider } from 'react-redux'
import Router from './Routes'
import Store from './Store'

import 'typeface-roboto'

const App = () => {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  )
}

export default App
