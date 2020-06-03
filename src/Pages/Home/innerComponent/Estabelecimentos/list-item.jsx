import React, { Fragment, forwardRef, useState, useEffect } from 'react'
import { List, ListItem, ListItemAvatar, ListItemText, IconButton, Divider, ListItemSecondaryAction, makeStyles, Avatar, Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useStore, useSelector } from 'react-redux'
import { ActionsEstabelecimentoSelected } from '../../../../store-redux/reducers/EstabelecimentoSelected'
import { ActionsProdutoSearch } from '../../../../store-redux/reducers/ProdutoSearch'

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
    ListItemAvatar: {
        paddingRight: theme.spacing(2)
    }
}))



const Estabelecimento = ({ item }, ref) => {

    const classes = useStyle() 
    const [redirectPage, setRedirectPage] = useState(false)
   
    const history = useHistory()

    const dispatch = useDispatch()

    const {StateEstabelecimentoSelected:state} = useSelector(state => state)

    
    const handlerGoToEstabelecimento = (item) => {

        dispatch(ActionsProdutoSearch.updateState({ owner: item._id, data: [], page: 1 }))

        dispatch(ActionsEstabelecimentoSelected.updateState({item}))


        setRedirectPage(prev => true)
      

    }

    useEffect(() => {

        if(redirectPage && state.item._id)
            history.push('/estabelecimento')


    }, [redirectPage, state.item._id] )

    return (
        <List ref={ref} className={classes.root}>
            <ListItem component="nav" alignItems="flex-start"  button onClick={() => handlerGoToEstabelecimento(item)}>
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

                    <IconButton onClick={() => handlerGoToEstabelecimento(item)}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </IconButton>
                </ListItemSecondaryAction>


            </ListItem>

            <Divider />


        </List>
    )
}

export default forwardRef(Estabelecimento)