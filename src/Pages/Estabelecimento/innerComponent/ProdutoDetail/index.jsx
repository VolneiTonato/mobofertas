import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
    Slide,
    Dialog,
    AppBar,
    Toolbar,
    DialogContent,
    Button,
    makeStyles,
    Box
} from '@material-ui/core'
import { ItemDetail } from './item-detail'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />
})

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
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
            <Box xs={6} sm={12}>
                <Dialog open={display} onClose={handlerOnClose} TransitionComponent={Transition} >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Button color="inherit" onClick={handlerOnClose}>
                                Fechar
                            </Button>
                        </Toolbar>
                    </AppBar>


                    <DialogContent>
                        <ItemDetail {...props} item={item} />
                    </DialogContent>
                </Dialog>
            </Box>
        )

    return null

})