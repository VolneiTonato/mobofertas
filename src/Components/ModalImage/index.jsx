import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
    Dialog,
    AppBar,
    Toolbar,
    DialogContent,
    Button,
    makeStyles,
    Grid
} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    image: {
        width:'100%'
    }
}));


export const ModalImage = forwardRef(({fullScreen, fullWidth, image }, ref) => {
    const [display, setDisplay] = useState(false)
    const classes = useStyles()

    if (!image)
        return null

    useImperativeHandle(ref, () => {
        return { handlerOnClose, handlerOnOpen }
    })

    const handlerOnOpen = () => setDisplay(true)
    const handlerOnClose = () => setDisplay(false)

    if (display)
        return (

            <Dialog fullScreen={fullScreen} fullWidth={fullWidth} open={display} onClose={handlerOnClose}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Button color="inherit" onClick={handlerOnClose}>
                            Voltar
                        </Button>
                    </Toolbar>
                </AppBar>

                <DialogContent>
                    <Grid container direction="column" alignContent="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <img src={image} className={classes.image} alt="" />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>

        )

    return null

})