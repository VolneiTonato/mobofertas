import React, { useEffect, Fragment, useRef, useCallback } from 'react'
import ListItemEstabelecimento from './list-item'
import { Grid, Box, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { size } from 'lodash'

import { useEstabelecimentoSearchContext } from '../../../../Context/EstabelecimentoSearchContext'
import { useCategorieFilterEstabelecimentoContext } from '../../../../Context/CategorieFilterEstabelecimentoContext'
//import { useContextMulti } from '../../../../Store/combine/outher'

const EstabelecimentosHome = () => {
    const {state, dispatch} = useEstabelecimentoSearchContext()
    const { state: stateCategorie } = useCategorieFilterEstabelecimentoContext()

    const observer = useRef()

    
    const lastElementRef = useCallback(node => {

        if (state.loading) return

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting && state.hasMore) 
                dispatch.pageNext()
        })

        if (node) observer.current.observe(node)

    }, [])

    useEffect(() => {
        dispatch.pesquisar()
    }, [state.query, state.page, state.categories])






    
    const MessageNotDataQuery = () => {
        return size(state.query) > 0 ? (
            <Alert variant="outlined" severity="warning">
                {'Nenhum estabelecimento encontrado com a pesquisa desejada.'}
            </Alert>
        ) : null
    }

    const MessageNotData = () => {
        return state.noData === true && size(state.query) === 0 ? (
            <Alert variant="outlined" severity="warning">
                {'Não há estabelecimentos cadastrados no mobofertas.'}
            </Alert>
        ) : null
    }


    return (
        <Fragment>
            
            {state.data.length > 0 ? (
                <Fragment>
                    {state.data.map((row, idx) =>
                        <Grid container key={row._id}>
                            <Grid item xs={12}>
                                {state.data.length === (idx + 1) ? (
                                    <ListItemEstabelecimento key={row._id} item={row} ref={lastElementRef} />
                                ) : (
                                    <ListItemEstabelecimento key={row._id} item={row} />
                                    )}
                            </Grid>
                        </Grid>
                    )}
                </Fragment>

            ) : state.loading || state.error ? null : (
                <Box component="span">
                    <MessageNotDataQuery />
                    <MessageNotData />
                </Box>)}

            <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                    {state.loading ? <Box textAlign="center" component="div"><CircularProgress color="inherit" /></Box> : null}
                    {state.error ? <Box component="span"><Alert variant="outlined" severity="error">Ocorreu um erro na pesquisa! Tente novamente.</Alert></Box> : null}
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default EstabelecimentosHome