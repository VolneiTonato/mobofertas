import React from 'react'

import { AppBar, Toolbar, Typography } from '@material-ui/core'
import SearchBar from '../../Components/SearchBar'


const AppBarHome = (props) => {
   
    return (

        <AppBar position="fixed" color="primary">
            <Toolbar>
                <Typography variant="h6">
                    MOB Ofertas
            </Typography>
            </Toolbar>
            <SearchBar placeholder="Digite aqui o estabelecimento" handlerOnChangeQuery={props.handlerOnChangeQuery} />


        </AppBar>
    )
}

export default AppBarHome