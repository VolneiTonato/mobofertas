import React from 'react'
import Router from './Routes'
import {AppContextProviderState} from './Store'

import 'typeface-roboto'

const App = () => {
  return (
    <AppContextProviderState>
      <Router />
    </AppContextProviderState>
  )
}

export default App
