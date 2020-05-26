import React, { useState, useEffect, useContext } from 'react'

import { Chip } from '@material-ui/core'
import { CategorieFilterEstabelecimentoContext } from '../../Context/CategorieFilterEstabelecimentoContext'


const ListItem = ({ categorie }) => {

    const { state: CategorieState, dispatch:CategorieDispatch } = useContext(CategorieFilterEstabelecimentoContext)
    const [color, setColor] = useState('default')
    const [checked, setChecked] = useState(false)



    const isChecked = (categorie) => {

        setChecked(prev => !prev)

        CategorieDispatch({
            type:'CATEGORIES_FILTER_ADD_ITEM_SELECTED',
            payload: categorie._id
        })
    }
    
    useEffect(() => {

        if(CategorieState.filterQuery.isClear)
            setChecked(false)

    }, [CategorieState.filterQuery.isClear])

    useEffect(() => {
        if (checked)
            setColor('primary')
        else
            setColor('default')
    }, [checked])


    useEffect(() => {

        const exists = CategorieState.filterQuery.itens.find(prev => prev === categorie._id)

        if (exists)
            setChecked(true)
    }, [])


    return (
        <Chip color={color} checked={checked} clickable onClick={(e) => isChecked(categorie)} label={categorie.descricao} />
    )
}


export default ListItem