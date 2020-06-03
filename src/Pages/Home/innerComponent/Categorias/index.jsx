import React, { Fragment, useState, useEffect } from 'react'
import { Chip, Badge } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

import DialogFilter from './dialog-filter'

import { useSelector } from 'react-redux'

const Categoria = () => {

    const [open, setOpen] = useState(false)
    const [chipDisabled, setChipDisabled] = useState(true)
    

    const {StateEstabelecimentoSearch, StateCategoriaFilterEstabelecimento } = useSelector(state => state)

    const handlerClickCategorie = () => {
        
        setOpen(true)
    }

    const handlerClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setChipDisabled(StateEstabelecimentoSearch.loading)
    }, [StateEstabelecimentoSearch.loading])

    return (
        <Fragment>
            <Badge overlap="circle" variant="standard" badgeContent={StateCategoriaFilterEstabelecimento.itensSelected.length} color="secondary">
                <Chip disabled={chipDisabled} dir="end" variant="default" size="medium" label="Categorias" onClick={handlerClickCategorie} onDelete={handlerClickCategorie} deleteIcon={<ExpandMore />} />
            </Badge>
            <DialogFilter handlerClose={handlerClose} open={open} />
        </Fragment>
    )

}

export default Categoria