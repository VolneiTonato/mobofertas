import React from 'react'
import { useHistory } from 'react-router-dom'

import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
const AppBarSettings = (props) => {

    const history = useHistory()

    const goBack = () => {
        history.push('/home')
    }

    return (

        <AppBar position="absolute" color="primary">
            <Toolbar>
                <IconButton edge="start" onClick={goBack} >
                    <FontAwesomeIcon icon={faChevronLeft} color="white" />
                </IconButton>
                <Typography variant="h6">
                    Settings
            </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AppBarSettings