import React from 'react'
import { useHistory } from 'react-router-dom'

import { AppBar, Toolbar, Typography, IconButton, Chip, Avatar } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const AppBarEstabelecimento = (props) => {

    const history = useHistory()
    const {item} = props

    const goBack = () => {
        history.push('/home')
    }

    return (

        <AppBar position="fixed" color="primary">
            <Toolbar>
                <IconButton edge="start" onClick={goBack} >
                    <FontAwesomeIcon icon={faChevronLeft} color="white" />
                </IconButton>
                <Typography variant="h6">
                    <Chip avatar={<Avatar alt={item.nome} src={`${process.env.REACT_APP_IMAGENS_ESTABELECIMENTOS}/${item.avatar}`} />} label={item.nome} />
            </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AppBarEstabelecimento