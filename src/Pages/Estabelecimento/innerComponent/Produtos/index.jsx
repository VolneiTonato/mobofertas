import React, { useEffect, Fragment, useRef, useCallback } from 'react'
import { Grid, Box, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import ProdutoItem from './list-item'
import { size } from 'lodash'
import { useProdutoSearchContext } from '../../../../Context/ProdutoSearchContext'

const ProdutosList = (props) => {

    const { state, dispatch } = useProdutoSearchContext()


    const observer = useRef()

    const lastProductElementRef = useCallback(node => {

        if (state.loading) return

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting && state.hasMore) {
                dispatch.pageNext()
            }
        })

        if (node) observer.current.observe(node)

    }, [state.loading, state.hasMore])//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch.pesquisar()
    }, [state.query, state.owner, state.page])//eslint-disable-line react-hooks/exhaustive-deps


    const MessageNotDataQuery = () => {
        return size(state.query) > 0 ? (
            <Alert variant="outlined" severity="warning">
                {'Nenhum produto encontrado com a pesquisa desejada.'}
            </Alert>
        ) : null
    }

    const MessageNotData = () => {
        return state.noData === true && size(state.query) === 0 ? (
            <Alert variant="outlined" severity="warning">
                {'Não há produtos cadastrados no momento para este estabelecimento.'}
            </Alert>
        ) : null
    }

    return (
        <Fragment>
            {state.data.length > 0 ? (
                <Fragment>
                    <Grid container spacing={3} >

                        {state.data.map((row, idx) => {
                            if (state.data.length === idx + 1) {
                                return <ProdutoItem key={row._id} item={row} ref={lastProductElementRef} />
                            } else {
                                return <ProdutoItem key={row._id} item={row} />
                            }
                        })}
                    </Grid>
                    <Box component="div" marginBottom={2} />

                </Fragment>
            ) : state.loading || state.error ? null : (
                <Box component="span">
                    <MessageNotDataQuery />
                    <MessageNotData />
                </Box>)}
            <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                    {state.loading ? <Box textAlign="center" component="div"><CircularProgress color="inherit" /></Box> : null}
                    {state.error ? <Box component="span"><Alert variant="outlined" severity="error">Ocorreu um erro na pesquisa! Tente novamente</Alert></Box> : null}
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default ProdutosList