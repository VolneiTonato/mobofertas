import React from 'react'
import Router from './Routes'
import {MasterProvider} from './Store'

import 'typeface-roboto'

const App = () => {
  return (
    <MasterProvider>
      <Router />
    </MasterProvider>
  )
}

export default App
