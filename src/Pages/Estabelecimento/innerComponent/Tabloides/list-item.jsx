import React, { useState, useEffect, useRef } from 'react'
import { Grid, Box, Card, CardActionArea, CardHeader, CardContent, CardMedia, makeStyles, Button, Avatar } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { ModalImage } from '../../../../Components/ModalImage'

const useStyles = makeStyles((theme) => ({

    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7)

    }

}))





const TabloideItem = ({ item }) => {

    const classes = useStyles()
    const [avatar, setAvatar] = useState(null)
    const [format, setFormat] = useState('')


    const modal = useRef()


    useEffect(() => {

        const formatDate = moment(item.dataValidade).format('DD/MM/YYYY')
        const now = moment().format('DD/MM/YYYY')

        if (now === format)
            setAvatar(<Avatar variant="circle" className={classes.largeAvatar} style={{ backgroundColor: red[500] }}>
                <Box fontSize={15} component="span" textAlign="center">Só Até Hoje</Box>
            </Avatar>)
        else
            setFormat(<Box component="div" textAlign="center">Válido até {formatDate}</Box>)

    }, [setAvatar, setFormat, classes, item])//eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Grid item xs={12} sm={4}>

            <Card elevation={3} variant="elevation" className={classes.root}>
                <CardHeader

                    avatar={avatar}
                    subheader={format}
                />
                <CardActionArea>
                    <Box component="div" padding={1}>
                        <CardMedia className={classes.media} image={`${item.imagem?.src}/${item.imagem?.name}`} title=""></CardMedia>
                    </Box>
                </CardActionArea>
                <CardContent>
                    <Box component="div" textAlign="center">
                        <Button onClick={(e) => modal.current.handlerOnOpen()} startIcon={<FontAwesomeIcon icon={faExternalLinkAlt} />}>
                            Abrir Tablóide
                    </Button>
                    </Box>
                </CardContent>
            </Card>


            <ModalImage fullScreen={true} ref={modal} image={`${item.imagem?.src}/${item.imagem?.name}`} />

        </Grid>
    )


}

export default TabloideItem