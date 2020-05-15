import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as theme from './Styles'
import { ThemeProvider } from '@material-ui/core'

//import {register} from './serviceWorker'

ReactDOM.render(
  <ThemeProvider theme={theme.base}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

//register({})


