import React from 'react'
import { useScrollTrigger, makeStyles, Zoom, Fab } from '@material-ui/core'
import {KeyboardArrowUp} from '@material-ui/icons'


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}))

export const ScrollTop = (props) => {

    const { children, window } = props

    const classes = useStyles()

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = (event) => {
        
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');


        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    )
}


export const ScrollTopButton = (props) => (

    <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUp />
        </Fab>
    </ScrollTop>

)