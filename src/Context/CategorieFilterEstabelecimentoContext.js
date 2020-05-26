import React, { createContext, useReducer } from 'react'
import Proptypes from 'prop-types'
import Reducer from '../Reducers/CategorieFilterEstabelecimentoReducer'
import { shuffle as randArray } from 'lodash'
import { ACTIONS } from '../Constants/actions'
import { ServiceCategoriaEstabelecimento as Api } from '../Services/MobOfertasApi/CategoriasEstabelecimentos'


const objectStruct = {
    state: {
        data: Proptypes.array,
        loading: Proptypes.bool,
        error: Proptypes.bool,
        filterQuery: {
            itens: Proptypes.array,
            isClear: Proptypes.bool
        }
    },
    dispatch: Proptypes.func
}

export const CategorieFilterEstabelecimentoContext = createContext(objectStruct)

let cacheSelectors = []

const INITIAL_STATE = {
    data: [],
    loading: false,
    error: false,
    filterQuery: {
        itens: [],
        isClear: false
    }
}

export function CategorieFilterEstabelecimentoProvider({ children }) {

    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)

    const fetchLoadData = async () => {
        cacheSelectors = []

        dispatch({ type: 'CATEGORIES_FILTER_LOADING' })

        let { data } = await Api.listCategoriasPrincipais()

        dispatch({ type: 'CATEGORIES_FILTER_AFTER_FETCH_LIST', payload: { data: randArray(data) } })
    }

    const handlerAplicateFilter = () => {
        dispatch({ type: 'CATEGORIES_FILTER_APPLY_SELECTED', payload: cacheSelectors})
    }

    const selectCheckBoxToUrl = (payload) => {

        if (!cacheSelectors.includes(payload))
            cacheSelectors.push(payload)
        else
            cacheSelectors = cacheSelectors.filter(prev => prev !== payload)

    }


    const customDispatch = async (action) => {

        switch (action.type) {

            case ACTIONS.CATEGORIE_FILTER_ESTABELECIMENTO.GET_ALL:

                await fetchLoadData()

                break

            case 'CATEGORIES_FILTER_ADD_ITEM_SELECTED':
                selectCheckBoxToUrl(action.payload)

                break

            case 'CATEGORIES_FILTER_APPLY_SELECTED':

                handlerAplicateFilter()
                break

            default:
                dispatch(action)
        }
    }



    return (
        <CategorieFilterEstabelecimentoContext.Provider value={{ state, dispatch: customDispatch }}>
            {children}
        </CategorieFilterEstabelecimentoContext.Provider>
    )

}

CategorieFilterEstabelecimentoProvider.prototypes = {
    children: Proptypes.node.isRequired
}