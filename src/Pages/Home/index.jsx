import React, { Fragment,  useState} from 'react'
import AppBarHome from './app-bar'
import Estabelecimento from './innerComponent/Estabelecimentos'
import { Box } from '@material-ui/core'
import { size } from 'lodash'

const Home = () => {

    const [query, setQuery] = useState()

    const handlerOnChangeQuery = (e) => {
        
        if(size(e.target.value) <= 30)
            setQuery(e.target.value)
    }

    
    return (
        <Fragment>

            <AppBarHome handlerOnChangeQuery={handlerOnChangeQuery} />

            <Box component="div" xs={12} marginTop={18}>
                <Estabelecimento query={query} />
            </Box>

        </Fragment>

    )
}

export default Home