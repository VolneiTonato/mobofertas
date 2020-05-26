import React, { createContext, useReducer } from 'react'
import Proptypes from 'prop-types'
import { ServiceMobOfertasApi as Api } from '../Services/MobOfertasApi'
import {ACTIONS} from '../Constants/actions'
import reducer from '../Reducers/EstabelecimentoSearchReducer'


export const EstabelecimentoSearchContext = createContext()

const INITIAL_STATE = {
    data: [],
    hasMore: false,
    loading: false,
    error: false,
    noData : false,
    query: '',
    page: 1
}


export function EstabelecimentoSearchProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    const pesquisar = async () => {

        try {
            return await Api.listEstabelecimentos(state.query, { page: state.page })
        } catch (err) {
            return { ...state, error: false }
        }

    }


    const customDispatch = async (action) => {



        switch (action.type) {


            case ACTIONS.ESTABELECIMENTO_SEARCH.PESQUISAR:

                dispatch({type:ACTIONS.ESTABELECIMENTO_SEARCH.LOADING})

                let res = await pesquisar()

                let notHaveData = res.response.length === 0 && state.page === 1

                let itens = state.page === 1 ? res.response : [...state.data, ...res.response]

                dispatch({type: ACTIONS.ESTABELECIMENTO_SEARCH.LIST_ITENS, payload: itens, hasMore: res.pageNext, noData : notHaveData})

                break

            default:
                dispatch(action)
                break
        }
    }

    return (
        <EstabelecimentoSearchContext.Provider value={{ state, dispatch: customDispatch }}>
            {children}
        </EstabelecimentoSearchContext.Provider>
    )

}

EstabelecimentoSearchProvider.prototypes = {
    children: Proptypes.node.isRequired
}