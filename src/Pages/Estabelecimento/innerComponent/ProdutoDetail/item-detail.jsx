import React, { useRef } from 'react'
import {
    makeStyles,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'

import {ModalImage} from '../../../../Components/ModalImage'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth:200,
        maxWidth:350,
        width: '100%',
    },
    media: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        minHeight:'150px',
        lineHeight: '150px'
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export const ItemDetail = (props) => {
    const classes = useStyles()

    const {item, ImagemItem, IconNoImage} = props

    const modalImage = useRef()


    return (
        <Card className={classes.root}>
            <CardMedia
                component="div"
                image={ImagemItem}
                children={
                    <Box xs={12} component="div">
                        {IconNoImage ? (
                            <FontAwesomeIcon color="#e7e4e4" size="8x" icon={faCameraRetro} />  
                        ): (
                            null
                        )}
                        
                    </Box>
                }
                onClick={(e) => {
                    if(modalImage.current)
                        modalImage.current.handlerOnOpen()
                }}
                className={classes.media}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {item.descricao}
                </Typography>
                <Box marginTop={2}></Box>
                <Typography variant="h5" color="textPrimary" component="p">
                    {`R$ ${item.precoAtual}`}
                </Typography>
            </CardContent>
            {/*
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Favorite />
                </IconButton>
                <IconButton aria-label="share">
                    <Share />
                </IconButton>
            </CardActions>
            */}

            <ModalImage fullWidth={true} image={ImagemItem} ref={modalImage} />
        </Card>
    )
}