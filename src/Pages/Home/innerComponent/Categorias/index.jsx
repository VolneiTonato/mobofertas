import React, { Fragment, useState, useEffect } from 'react'
import { Chip, Badge } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

import DialogFilter from './dialog-filter'

import { useCategorieFilterEstabelecimentoContext } from '../../../../Context/CategorieFilterEstabelecimentoContext'
import { useEstabelecimentoSearchContext } from '../../../../Context/EstabelecimentoSearchContext'

const Categoria = () => {

    const [open, setOpen] = useState(false)
    const [chipDisabled, setChipDisabled] = useState(true)
    const { state: categorieFilter } = useCategorieFilterEstabelecimentoContext()
    const { state:StateEtabelecimento} = useEstabelecimentoSearchContext()

    const handlerClickCategorie = () => {
        
        setOpen(true)
    }

    const handlerClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setChipDisabled(StateEtabelecimento.loading)
    }, [StateEtabelecimento.loading])

    return (
        <Fragment>
            <Badge overlap="circle" variant="standard" badgeContent={categorieFilter.itensSelected.length} color="secondary">
                <Chip disabled={chipDisabled} dir="end" variant="default" size="medium" label="Categorias" onClick={handlerClickCategorie} onDelete={handlerClickCategorie} deleteIcon={<ExpandMore />} />
            </Badge>
            <DialogFilter handlerClose={handlerClose} open={open} />
        </Fragment>
    )

}

export default Categoria