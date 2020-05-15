import React, { useEffect, useState, Fragment, useRef, useCallback } from 'react'
import ListItemEstabelecimento from './list-item'
import { Grid, Box, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {size} from 'lodash'
import { useEstabelecimentoSearchScroll } from '../../../../Components/ApiSearchScroll/EstabelecimentosHome'

const EstabelecimentosHome = (props) => {
    const [page, setPage] = useState(1)

    const { query } = props


    useEffect(() => {
        setPage(1)
    }, [query])


    const {
        error,
        estabelecimentos,
        hasMore,
        loading
    } = useEstabelecimentoSearchScroll(query, page)


    const observer = useRef()

    const lastElementRef = useCallback(node => {
        if (loading) return

        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {

            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1)
            }
        })

        if (node) observer.current.observe(node)

    }, [loading, hasMore])


    useEffect(() => {
        setPage(1)
    }, [])

    return (
        <Fragment>
            {estabelecimentos.length > 0 ? (
                <Fragment>
                    {estabelecimentos.map((row, idx) =>
                        <Grid container key={row._id}>
                            <Grid item xs={12}>
                                {estabelecimentos.length === (idx + 1) ? (
                                    <ListItemEstabelecimento key={row._id} item={row} ref={lastElementRef} />
                                ) : (
                                        <ListItemEstabelecimento key={row._id} item={row} />
                                    )}
                            </Grid>
                        </Grid>
                    )}
                </Fragment>

            ) : loading || error ? null : (
            <Box component="span">
                <Alert variant="outlined" severity="warning">
                {
                            size(query) ? 'Nenhum estabelecimento encontrado com a pesquisa desejada.'
                                : 'Não há estabelecimentos cadastrados no momento.'
                        }
                </Alert>
                </Box>)}

            <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                    {loading ? <Box textAlign="center" component="div"><CircularProgress color="inherit" /></Box> : null}
                    {error ? <Box component="span"><Alert variant="outlined" severity="error">Ocorreu um erro na pesquisa! Tente novamente.</Alert></Box> : null}
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default EstabelecimentosHome