import React, {useContext} from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import SearchBar from '../../Components/SearchBar'
import {EstabelecimentoSearchContext} from '../../Context/EstabelecimentoSearchContext'
import { size } from 'lodash'
import { ACTIONS} from '../../Constants/actions'

const AppBarHome = (props) => {

    const {dispatch} = useContext(EstabelecimentoSearchContext)

    const handlerOnChangeQuery = (e) => {
        if(size(e.target.value) <= 30)
            dispatch({type:ACTIONS.ESTABELECIMENTO_SEARCH.CHANGE_QUERY, payload: e.target.value})
    }
   
    return (

        <AppBar position="fixed" color="primary">
            <Toolbar>
                <Typography variant="h6">
                    MOB Ofertas
            </Typography>
            </Toolbar>
            <SearchBar placeholder="Digite aqui o estabelecimento" handlerOnChangeQuery={handlerOnChangeQuery} />


        </AppBar>
    )
}

export default AppBarHome