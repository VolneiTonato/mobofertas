import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LayoutApp from '../Components/Layout'
import HomePage from '../Pages/Home'
import ContatoPage from '../Pages/Contato'
import EstabelecimentoPage from '../Pages/Estabelecimento'


export const RouterNavigationBottomPrimary = (props) => {



    return (
        <Switch>
            <Route exact path="/" render={renderProps => <LayoutApp {...props} {...renderProps}><HomePage {...props} {...renderProps} /></LayoutApp>} />
            <Route exact path="/home" render={renderProps => <LayoutApp {...props} {...renderProps}><HomePage {...props} {...renderProps} /></LayoutApp>} />
            {/*<Route exact path="/divulgar" render={renderProps => <LayoutApp {...props} {...renderProps}><HomePage {...props} {...renderProps} /></LayoutApp>} />*/}
            <Route exact path="/contato" render={renderProps => <LayoutApp {...props} {...renderProps}><ContatoPage {...props} {...renderProps} /></LayoutApp>} />
            <Route exact path="/estabelecimento" render={(renderProps) => <EstabelecimentoPage {...props} {...renderProps} />} />
            <Route path="/*" render={e => <h1>Page Not Fount!</h1>} />
        </Switch>
    )
}

