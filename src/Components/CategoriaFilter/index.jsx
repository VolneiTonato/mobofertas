import React, { useContext } from 'react'
import { useEffect } from 'react'
import { ACTIONS } from '../../Constants/actions'
import ListItem from './list'
import { Grid } from '@material-ui/core'
import { CategorieFilterEstabelecimentoContext } from '../../Context/CategorieFilterEstabelecimentoContext'


const CategoriaFilter = () => {
    const { state:CategorieState, dispatch } = useContext(CategorieFilterEstabelecimentoContext)


    

    useEffect(() => {
        dispatch({
            type: ACTIONS.CATEGORIE_FILTER_ESTABELECIMENTO.GET_ALL
        })
    }, [])




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

            ) : null
            }
            {CategorieState.loading && <p>Carregando</p>}

        </>
    )
}

export default CategoriaFilter