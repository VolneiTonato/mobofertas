import React, { createContext, useState, useContext } from 'react'
import { ServiceMobOfertasApi as Api } from '../../Services/MobOfertasApi'

const defineDefaultState = {
    data: [],
    loading: false,
    error: false,
    hasMore: false,
    noData: false,
    page: 1,
    owner: '',
    query: ''
}

const defineDefaultDispatch = {
    updateState: (data = defineDefaultState) => { },
    pesquisar: () => { },
    pageNext: () => { },
    pageReset: () => { }
}

const defineDefaultObject = {
    state: defineDefaultState,
    dispatch: defineDefaultDispatch
}
const ProdutoSearchContext = createContext(defineDefaultObject)

export function ProdutoSearchProvider({ children }) {
    const [state, setState] = useState(defineDefaultState)


    const pesquisar = async () => {

        try {

            dispatch.updateState({ loading: true })


            const res = await Api.listProdutosByEstabelecimento(state.owner, state.query, { page: state.page })

            let noData = res.response?.length === 0 && state.page === 1

            dispatch.updateState({ data: res.response, hasMore: res.pageNext, loading: false, noData: noData })

        } catch (err) {
            dispatch.updateState({ loading: false, error: true })

        }
    }


    const handlerCustomDispatch = () => {

        return {

            updateState: (data = defineDefaultState) => {
                setState(prev => {return {...prev, ...data}})
            },

            pageReset: () => dispatch.updateState({ page: 1 }),

            pageNext: () => dispatch.updateState({ page: state.page + 1 }),

            pesquisar: pesquisar,


            
        }
    }

    const dispatch = handlerCustomDispatch()

    return (
        <ProdutoSearchContext.Provider value={{ state: Object.freeze(state), dispatch }}>
            {children}
        </ProdutoSearchContext.Provider>
    )
}


export const useProdutoSearchContext = () => {
    return useContext(ProdutoSearchContext)
}