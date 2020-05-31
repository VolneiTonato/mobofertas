import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { teal } from '@material-ui/core/colors'
import {
    Dialog,
    Toolbar,
    DialogContent,
    Button,
    makeStyles,
    Grid,
    DialogTitle,
    Typography
} from '@material-ui/core'
import { ItemDetail } from './item-detail'


const useStyles = makeStyles((theme) => ({
    DialogTitle:{
        padding:0
    },
    buttonClose: {
        color: teal['50']
    }
}));


export const ModalDetailItem = forwardRef((props, ref) => {
    const [display, setDisplay] = useState(false)
    const classes = useStyles()

    const { item } = props


    if (!item)
        return null

    useImperativeHandle(ref, () => {
        return { handlerOnClose, handlerOnOpen }
    })

    const handlerOnOpen = () => setDisplay(true)
    const handlerOnClose = () => setDisplay(false)

    if (display)
        return (
            
                <Dialog open={display} onClose={handlerOnClose} maxWidth="sm" fullWidth={true}>

                    <DialogTitle className={classes.DialogTitle}>
                        <Toolbar>
                            <Button onClick={handlerOnClose}>
                                <Typography className={classes.buttonClose}>{`FECHAR`}</Typography>
                            </Button>
                        </Toolbar>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container justify="center">
                            <ItemDetail {...props} item={item} />
                        </Grid>
                    </DialogContent>
                </Dialog>
            
        )

    return null

})