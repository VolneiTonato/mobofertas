import React, { useEffect,useRef, useState, forwardRef } from 'react'
import {  Box, Avatar, makeStyles, Divider, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'
import { lowerCase, startCase, truncate, isString, size } from 'lodash'
import {ModalDetailItem} from '../ProdutoDetail'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    
    ListItemAvatar:{
        paddingRight:3,

    },
    largeAvatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        backgroundColor:'transparent'

    },
    ListItem:{
        paddingLeft: 1,
        margin:0,
        maxHeight:80,
        height:"80hv",
        alignItems:"center"
    }

}))

const ProdutoItem = (props, ref) => {

    const classes = useStyles()
    const { item } = props
    const [imagemItem, setImagemItem] = useState(null)
    const [iconCamera, setIconCamera] = useState(null)

    const modal = useRef()

    useEffect(() => {
        if (isString(item.imagem) && size(item.imagem))
            setImagemItem(item.imagem)
        else    
            setIconCamera(<FontAwesomeIcon color="#e7e4e4" size="2x" icon={faCameraRetro} />)

    }, [])


    return (

        <List ref={ref} className={classes.root} >
            <ListItem alignItems="center" className={classes.ListItem} onClick={() => modal.current.handlerOnOpen()}  button component="nav">
                <ListItemAvatar className={classes.ListItemAvatar}>
                    <Avatar  src={imagemItem} className={classes.largeAvatar} variant="square" alt={item.descricao}>
                        {iconCamera}
                    </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                    primary={
                        <Box
                            fontSize={15}
                            component="span"
                            textAlign="left"
                        >
                            {truncate(startCase(lowerCase(item.descricao)), {length:50})}
                        </Box>
                    }
                    secondary={
                        <Box
                            fontSize={15}
                            component="span"
                            textAlign="left"
                        >
                            {`R$ ${item.precoAtual}`}
                        </Box>
                    }
                >

                </ListItemText>

            </ListItem>
            <Divider />
            <ModalDetailItem ImagemItem={imagemItem} IconNoImage={iconCamera} item={item} ref={modal} />
        </List>

    )


}

export default forwardRef(ProdutoItem)