import React, { Fragment, useState, useEffect} from 'react'
import {Link, useHistory, withRouter} from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, AppBar } from '@material-ui/core'
import { PeopleOutline, HomeOutlined } from '@material-ui/icons'

const urls = ['/home','/contato']

const LayoutApp = (props) => {

    const history = useHistory()

    const [value, setValue] = useState(urls[0])

    useEffect(() => {

        let path = history?.location?.pathname

        if(path)
            path = `${path.replace(/\/$/ig,'')}`

        if(urls.indexOf(path) === -1)
            setValue('/home')
        else
            setValue(path)

    }, [props, history])

    return (
        <Fragment>

            {props.children}

            <AppBar position="fixed" color="primary" style={{top: "auto", bottom: 0 }}>
                    <BottomNavigation
                        value={value}
                        onChange={(e, newValue) => {
                            setValue( newValue)
                        }}
                        showLabels
                    >
                        <BottomNavigationAction value={urls[0]} to={urls[0]} component={Link}  label="Início" icon={<HomeOutlined />} />
                        {/*<BottomNavigationAction value={urls[1]} to={urls[1]} component={Link}  label="Configuração" icon={<SettingsOutlined />} />*/}
                        <BottomNavigationAction value={urls[1]} to={urls[1]} component={Link}  label="Contato" icon={<PeopleOutline />} />
                    </BottomNavigation>

                
            </AppBar>
        </Fragment>

    )
}

export default withRouter(LayoutApp)