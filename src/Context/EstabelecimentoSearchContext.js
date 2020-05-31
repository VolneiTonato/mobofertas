import React, { createContext, useReducer, useContext } from 'react'
import { ServiceMobOfertasApi as Api } from '../Services/MobOfertasApi'


const defineObjectState = Object.freeze({
    data: [],
    hasMore: false,
    loading: false,
    error: false,
    noData: false,
    query: '',
    categories: [],
    page: 1
})

const defineObjectContext = {
    state: defineObjectState,
    dispatch: {
        updateState: (data = defineObjectState) => { },
        pageNext: () => { },
        pesquisar: () => { }

    }
}

const defineDefaultCallDispatch = {
    type: '',
    payload: defineObjectState
}


const reducer = (state, {type, payload}) => {
    switch(type){
        case 'UPDATE':
            return {...state, ...payload}
        default:
            return state
    }
}


const EstabelecimentoSearchContext = createContext(defineObjectContext)


export function EstabelecimentoSearchProvider({ children }) {

    const [state, callDispatch = defineDefaultCallDispatch] = useReducer(reducer, defineObjectState)

    const pesquisar = async () => {

        try {

            dispatch.updateState({ loading: true })

            let res = await Api.listEstabelecimentos(state.query, state.categories, { page: state.page })

            let noData = res.response?.length === 0 && state.page === 1

            dispatch.updateState({ data: res.response, hasMore: res.pageNext, loading: false, noData: noData })

        } catch (err) {
            dispatch.updateState({ error: true, loading: false })
        }

        return state
    }

    const handlerCustomDispatch = () => {

        return {

            updateState: (data = defineObjectState) => {
                callDispatch({type: 'UPDATE', payload: data})
            },

            pesquisar: pesquisar,

            pageNext: () => {
                return handlerCustomDispatch().updateState({ page: state.page + 1 })
            }
        }
    }

    const dispatch = handlerCustomDispatch()



    return (
        <EstabelecimentoSearchContext.Provider value={{ state: Object.freeze(state), dispatch }}>
            {children}
        </EstabelecimentoSearchContext.Provider>
    )

}

export const useEstabelecimentoSearchContext = () => {
    return useContext(EstabelecimentoSearchContext)
}
