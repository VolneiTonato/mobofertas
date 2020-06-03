import React, { useState, useEffect } from 'react'
import { Chip } from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux'
import {ActionsCategoriaFilterEstabelecimento} from '../../store-redux/reducers/CategoriaFilterEstabelecimento'


const ListItem = ({ categorie }) => {

    const dispatch = useDispatch()

    const {StateCategoriaFilterEstabelecimento:CategorieState} = useSelector(state => state)

    const [color, setColor] = useState('default')
    const [checked, setChecked] = useState(false)



    const isChecked = (categorie) => {

        setChecked(prev => !prev)

        dispatch(ActionsCategoriaFilterEstabelecimento.changeItemSelectedCache(categorie._id))
    }

    useEffect(() => {

        if (CategorieState.isClear)
            setChecked(false)

    }, [CategorieState.isClear, CategorieState.cacheItensSelected])

    useEffect(() => {
        if (checked)
            setColor('primary')
        else
            setColor('default')
    }, [checked])


    useEffect(() => {

        const exists = CategorieState.itensSelected.find(prev => prev === categorie._id)

        if (exists)
            setChecked(true)
    }, [])//eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Chip color={color} checked={checked} clickable onClick={(e) => isChecked(categorie)} label={categorie.descricao} />
    )
}


export default ListItem