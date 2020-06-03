import React, { createContext, useContext } from 'react'
import { ServiceCategoriaEstabelecimento as Api } from '../../Services/MobOfertasApi/CategoriasEstabelecimentostos'
import { clone as cloneObject } from 'lodash'

const defineObjectState = {
    data: [],
    loading: false,
    error: false,
    itensSelected: [],
    cacheItensSelected: [],
    noData: false,
    isClear: false
}

const defineObjectContext = {
    state: defineObjectState,
    dispatch: {
        updateState: (data = defineObjectState) => { },
        pesquisar: () => { },
        changeItemSelectedCache: (payload) => { },
        aplicarFiltros: () => { },
        clearFilters: () => { },
    }
}



const useStateReducer = (prevState, dispatchArg) => typeof dispatchArg === 'function' ? dispatchArg(prevState) : dispatchArg

const useStateInitializer = initialArg =>  typeof initialArg === 'function' ? initialArg() : initialArg

const useState = (initialValue) => {
    return React.useReducer(useStateReducer, initialValue, useStateInitializer)
}


const CategorieFilterEstabelecimentoContext = createContext(defineObjectContext)

CategorieFilterEstabelecimentoContext.displayName = "CategorieFilterEstabelecimentoContext"


export function CategorieFilterEstabelecimentoProvider({ children }) {

    const [state, setState] = useState(defineObjectState)


    const pesquisar = async () => {
        try {

            if (state.data.length)
                return state

            dispatch.updateState({ loading: true })

            let res = await Api.listCategoriasPrincipais()

            

            

            let noData = res.data && res.data?.length === 0 && state.page === 1

            dispatch.updateState({ data: res.data, loading: false, noData: noData, error: false, cacheItensSelected: [], isClear: false })

        } catch (err) {

            dispatch.updateState({ error: true, loading: false })
        }

        return state
    }

    const aplicarFiltros = () => {

        let itens = []

        let isClear = state.isClear



        if (isClear === false) {
            itens = cloneObject(state.cacheItensSelected)

            if (isClear === false && state.itensSelected.length > 0 && state.cacheItensSelected.length === 0)
                itens = cloneObject(state.itensSelected)

        }

        
        dispatch.updateState({ itensSelected: itens, cacheItensSelected: itens, isClear: false })

        return state
    }

    const changeItemSelectedCache = (payload) => {

        let cacheItens = []

        if (state.isClear === false && state.itensSelected.length > 0 && state.cacheItensSelected.length === 0)
            cacheItens = cloneObject(state.itensSelected)

        if (cacheItens.length === 0)
            cacheItens = cloneObject(state.cacheItensSelected)



        if (cacheItens.includes(payload))
            cacheItens = cacheItens.filter(prev => prev !== payload)
        else
            cacheItens.push(payload)

        if (cacheItens.length)
            dispatch.updateState({ isClear: false, cacheItensSelected: cacheItens })
        else
            dispatch.updateState({ isClear: true, cacheItensSelected: cacheItens })

        return state
    }





    const handlerCustomDispatch = () => {

        return {

            updateState: (data = defineObjectState) => {
                setState(prev => {return {...prev, ...data}})
            },

            pesquisar: pesquisar,

        

            changeItemSelectedCache: changeItemSelectedCache,

            aplicarFiltros: aplicarFiltros,

            clearFilters: () => {
                dispatch.updateState({ cacheItensSelected: [], isClear: true })

                return state
            }
        }
    }

    const dispatch = handlerCustomDispatch()


    return (
        <CategorieFilterEstabelecimentoContext.Provider value={{ state: Object.freeze(state), dispatch }}>
            {children}
        </CategorieFilterEstabelecimentoContext.Provider>
    )

}



export const useCategorieFilterEstabelecimentoContext = () => {
    return useContext(CategorieFilterEstabelecimentoContext)
}

