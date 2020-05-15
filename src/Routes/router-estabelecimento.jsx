import React from 'react'
import { Route, Switch } from 'react-router-dom'
import EstabelecimentoPage from '../Pages/Estabelecimento'

export const RouterEstabelecimento = (props) => {

    return (
        <Switch>
            <Route exact path="/estabelecimento" render={(renderProps) => <EstabelecimentoPage {...props} {...renderProps} />} />
        </Switch>
    )
}

