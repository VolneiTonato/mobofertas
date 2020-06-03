import React, { Fragment} from 'react'
import AppBarHome from './app-bar'
import Categoria from './innerComponent/Categorias'
import Estabelecimento from './innerComponent/Estabelecimentos'
import { Box } from '@material-ui/core'


const Home = () => {


    return (
        <Fragment>
            
            <AppBarHome />

            <Box component="div" xs={12} marginTop={18}></Box>

            <Box component="div">
                <Categoria />
            </Box>

            <Box component="div" xs={12} marginTop={1}>
                <Estabelecimento />
            </Box>

        </Fragment>

    )
}

export default Home