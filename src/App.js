import React from 'react'
import Router from './Routes'
import { store } from './store-redux'
import { Provider } from 'react-redux'

import 'typeface-roboto'

const App = () => {
  return (
    <Provider store={store}>
        <Router />
    </Provider>
  )
}

export default App
