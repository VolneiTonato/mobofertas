import React from 'react'
import { useEffect } from 'react'
import ListItem from './list'
import { Grid } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { useDispatch, useSelector } from 'react-redux'
import { ActionsCategoriaFilterEstabelecimento } from '../../store-redux/reducers/CategoriaFilterEstabelecimento'


const CategoriaFilter = () => {

    const dispatch = useDispatch()
    const { StateCategoriaFilterEstabelecimento: CategorieState } = useSelector(state => state)

    useEffect(() => {
        dispatch(ActionsCategoriaFilterEstabelecimento.Pesquisar())
    }, []) //eslint-disable-line react-hooks/exhaustive-deps




    return (
        <>
            {CategorieState.data.length ? (
                <Grid container justify="center">
                    <Grid item xs={12}>

                        <Grid container spacing={2}>
                            {CategorieState.data.map(row => (
                                <Grid key={row._id} item component="span">
                                    <ListItem categorie={row} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

            ) : CategorieState.noData && CategorieState.error === false ? <Alert variant="outlined" severity="warning">
                {'Não há categorias cadastrados no momento para este estabelecimento.'}
            </Alert> : null
            }
            {CategorieState.loading && <p>Carregando</p>}
            {CategorieState.error && <Alert variant="outlined" severity="error">
                {'Ocorreu um erro ao pesquisar categorias! Tente novamente.'}
            </Alert>}

        </>
    )
}

export default CategoriaFilter