import React, { useContext } from 'react'
import { Box, makeStyles, Button, Dialog, DialogContent, DialogActions, DialogTitle, Typography } from '@material-ui/core'
import CategoriaFiltro from '../../../../Components/CategoriaFilter'
import { CategorieFilterEstabelecimentoContext } from '../../../../Context/CategorieFilterEstabelecimentoContext'

const DrawerFilter = (props) => {
    const { dispatch: dispatchCategorieContext } = useContext(CategorieFilterEstabelecimentoContext)

    const handlerClearSelecteds = () => {
        dispatchCategorieContext({
            type: 'CATEGORIES_FILTER_CLEAR_SELECTED'
        })
    }

    const handlerAplicationFilter = () => {

        dispatchCategorieContext({
            type: "CATEGORIES_FILTER_APPLY_SELECTED"
        })

        props.handlerClose()
    }


    return (

        <Dialog open={props.open} onBackdropClick={props.handlerClose}>

            <DialogTitle>

                <Box display="flex">

                    <Box flexGrow={1}>Categorias</Box>
                    <Box>
                        <Button onClick={handlerClearSelecteds} variant="text">LIMPAR</Button>
                    </Box>

                </Box>

            </DialogTitle>

            <DialogContent>
                <CategoriaFiltro />
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={handlerAplicationFilter} fullWidth color="primary">
                    Aplicar
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export default DrawerFilter

