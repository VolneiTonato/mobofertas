import React, { useState , useEffect} from 'react'
import { Box, Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import CategoriaFiltro from '../../../../Components/CategoriaFilter'
import { useCategorieFilterEstabelecimentoContext } from '../../../../Context/CategorieFilterEstabelecimentoContext'
import { useEstabelecimentoSearchContext} from '../../../../Context/EstabelecimentoSearchContext'

const DrawerFilter = (props) => {
    const [disabledButton, setDisabledButton] = useState(true)
    const {dispatch:dispatchEstabelecimento} = useEstabelecimentoSearchContext()
    const {state, dispatch: dispatchCategorieContext } = useCategorieFilterEstabelecimentoContext()
    const [aplyFilter, setAplyFilter] = useState(false)


    const handlerClearSelecteds = (e) => {
        e.preventDefault()

        handlerDisableButton()

        dispatchCategorieContext.clearFilters()
    }


    const handlerAplicationFilter = () => {

        dispatchCategorieContext.aplicarFiltros()

        setAplyFilter(true)
        
        props.handlerClose()
    }

    const handlerDisableButton = () => {

        setDisabledButton(false)
    }


    useEffect(() => {

        if(aplyFilter)
            dispatchEstabelecimento.updateState({categories: state.itensSelected, data:[], page:1})

        return () => {
            setAplyFilter(false)
        }

    }, [aplyFilter])



    return (

        <Dialog onEnter={e => setDisabledButton(true)} open={props.open} onClose={props.handlerClose}>

            <DialogTitle>

                <Box display="flex">

                    <Box flexGrow={1}>Categorias</Box>
                    <Box>
                        <Button onClick={handlerClearSelecteds} variant="text">LIMPAR</Button>
                    </Box>

                </Box>

            </DialogTitle>

            <DialogContent onClick={handlerDisableButton}>
                <CategoriaFiltro />
            </DialogContent>

            <DialogActions>
                <Button variant="contained" disabled={disabledButton} onClick={handlerAplicationFilter} fullWidth color="primary">
                    Aplicar
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export default DrawerFilter

