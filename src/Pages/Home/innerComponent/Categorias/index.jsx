import React, { Fragment, useState, useContext } from 'react'
import { Chip, Badge } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

import DialogFilter from './dialog-filter'

import { CategorieFilterEstabelecimentoContext } from '../../../../Context/CategorieFilterEstabelecimentoContext'

const Categoria = () => {

    const [open, setOpen] = useState(false)
    const { state: categorieFilter } = useContext(CategorieFilterEstabelecimentoContext)

    const handlerClickCategorie = () => {
        setOpen(true)
    }

    const handlerClose = () => {
        setOpen(false)
    }

    return (
        <Fragment>
            <Badge overlap="circle" variant="standard" badgeContent={categorieFilter.filterQuery.itens.length} color="secondary">
                <Chip dir="end" variant="default" size="medium" label="Categorias" onClick={handlerClickCategorie} onDelete={handlerClickCategorie} deleteIcon={<ExpandMore />} />
            </Badge>
            <DialogFilter handlerClose={handlerClose} open={open} />
        </Fragment>
    )

}

export default Categoria