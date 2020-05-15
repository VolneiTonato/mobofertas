import React, { Fragment, forwardRef } from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, IconButton, Divider, ListItemSecondaryAction, ListItemIcon, makeStyles, Avatar, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),

    },
    ListItemAvatar:{
        paddingRight:theme.spacing(2)
    }
}))

const Estabelecimento = ({ item }, ref) => {

    const classes = useStyle()

    const history = useHistory()

    const handlerGoToEstabelecimento = (item) => {
        history.push('/estabelecimento', { item })
    }

    return (
        <List ref={ref} className={classes.root}>
            <ListItem component="nav" alignItems="flex-start" button onClick={(e) => handlerGoToEstabelecimento(item)}>
                <ListItemAvatar className={classes.ListItemAvatar}>
                    <Avatar alt={item.nome} variant="square" className={classes.largeAvatar} src={`${process.env.REACT_APP_IMAGENS_ESTABELECIMENTOS}/${item.avatar}`} />
                </ListItemAvatar>
                <ListItemText
                    primary={item.nome}
                    secondary={
                        <Fragment>
                            <Box component="span" display="block" fontSize={12} padding={0} margin={0}>
                                {`${item.categoria?.descricao}`}
                            </Box>

                            <Box overflow="hidden" display="block" flexWrap="nowrap" component="span" fontSize={12} marginTop={0}>
                                {`${item.endereco.logradouro} - ${item.endereco.numero}, bairro ${item.endereco.bairro}`}
                            </Box>

                        </Fragment>
                    }
                />

                <ListItemSecondaryAction>
                    
                    <IconButton onClick={(e) => handlerGoToEstabelecimento(item)}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </IconButton>
                </ListItemSecondaryAction>


            </ListItem>

            <Divider />


        </List>
    )
}

export default forwardRef(Estabelecimento)