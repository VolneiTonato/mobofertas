import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import SearchBar from '../../Components/SearchBar'
import {ActionsEstabelecimentoSearch} from '../../store-redux/reducers/EstabelecimentoSearch'
import {useDispatch} from 'react-redux'
import { size } from 'lodash'

const AppBarHome = (props) => {

    const dispatch = useDispatch()

    const handlerOnChangeQuery = (e) => {
        if(size(e.target.value) <= 30)
            dispatch(ActionsEstabelecimentoSearch.updateState({query:e.target.value, page:1, data: []}))
        
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