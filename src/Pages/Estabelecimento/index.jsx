import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Box, AppBar, Typography, Tab, Tabs } from '@material-ui/core'
import { ScrollTopButton } from '../../Components/ScrollTop'

import AppBarEstabelecimento from './app-bar'
import SearchBar from '../../Components/SearchBar'

import { ActionsProdutoSearch } from '../../store-redux/reducers/ProdutoSearch'

import {useSelector, useDispatch} from 'react-redux'
import LojaInfo from './innerComponent/Loja'
import TabloideList from './innerComponent/Tabloides'
import ProdutoList from './innerComponent/Produtos'

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

const a11yProps = (index) => {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    }
}

const LinkTab = (props) => {
    return (
        <Tab
            component="a"
            style={{ margin: 'auto', justifyContent: 'center' }}
            onClick={(event) => {
                event.preventDefault()
            }}
            {...props}
        />
    )
}


const Estabelecimento = (props) => {

    const [value, setValue] = useState(0)
    const { match } = props

    const dispatch = useDispatch()

    const {StateEstabelecimentoSelected:state} = useSelector(state => state)

    
    if (state.item?._id === undefined)
        return <Redirect to={{ pathname: '/home', state: props.location }} />
        

    const handlerOnChangeQuery = (e) => {

        dispatch(ActionsProdutoSearch.updateState({page:1, query:e.target.value, data:[]}))

    }



    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    



    return (
        <Fragment>

            <AppBarEstabelecimento item={state.item} />

            <Box marginTop={10}></Box>


            <AppBar color="transparent" position="static" id="back-to-top-anchor">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                >
                    <LinkTab label="Produtos" href={`${match?.url}/tab-produtos`} {...a11yProps(0)} />
                    <LinkTab label="Tablóides" href={`${match?.url}/tab-tabloide`} {...a11yProps(1)} />
                    <LinkTab label="Loja" href={`${match?.url}/tab-loja`} {...a11yProps(2)} />

                </Tabs>

            </AppBar>

            <TabPanel value={value} index={0}>
                <SearchBar handlerOnChangeQuery={handlerOnChangeQuery} placeholder="Pesquise o produto aqui" />
                <Box marginBottom={2}></Box>
                <ProdutoList />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <TabloideList />
            </TabPanel>


            <TabPanel value={value} index={2}>
                <LojaInfo />
            </TabPanel>


            <ScrollTopButton {...props} />


        </Fragment>

    )
}

export default Estabelecimento