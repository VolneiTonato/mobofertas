import React, {useEffect, useState, Fragment} from 'react'
import {ServiceMobOfertasApi} from '../../../../Services/MobOfertasApi'
import {Grid, Box, CircularProgress} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import TabloideItem from './list-item'

const Tabloide = (props) => {

    const {item} = props
    const [tabloides, setTabloides] = useState([])
    const [displayNotTabloide, setDisplayNotTabloide]  = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)


    const pesquisarTabloides = async () => {
        try{
            setLoading(true)
            await ServiceMobOfertasApi.listTabloidesByEstabelecimento(item._id)
            .then((data) => {
                let response = data?.response || []
                
                setDisplayNotTabloide(response.length === 0)
                setTabloides(response)
            })
        }catch(err){
            setError(true)
        }finally{
            setLoading(false)
        }

        
    }

    useEffect(() =>{
        pesquisarTabloides()
    }, [])
    

    return (
        <Fragment>
            {tabloides.length > 0 ? (
                <Grid container spacing={3}>
                    {tabloides.map(row => (
                        <TabloideItem key={row._id} item={row} />
                    ))}
                </Grid>
            ): displayNotTabloide ? <Box component="span"><Alert variant="outlined" severity="warning">Não há tablóides para este estabelecimento no momento.</Alert></Box> : null}
            <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                    {loading ? <Box textAlign="center" component="div"><CircularProgress color="inherit" /></Box> : null}
                    {error ? <Box component="span"><Alert variant="outlined" severity="error">Ocorreu um erro na pesquisa! Tente novamente</Alert></Box> : null}
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Tabloide