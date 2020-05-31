import React, { createContext,  useState } from 'react'

const defineDefaultState = {
    item: {},
}

const defineDefaultDispatch = {
    updateState: (data = defineDefaultState) => { }
}

const defineDefaultObject = {
    state: defineDefaultState,
    dispatch: defineDefaultDispatch
}



const EstabelecimentoSelecionadoContext = createContext(defineDefaultObject)

export function EstabelecimentoSelecionadoProvider({ children }) {
    const [state, callDispatch] = useState(defineDefaultState)

    const handlerCustomDispatch = () => {

        return {

            updateState: (data = defineDefaultState) => {
                callDispatch(prev => {return { ...prev, ...data }})
            }
        }
    }

    const dispatch = handlerCustomDispatch()

    return (
        <EstabelecimentoSelecionadoContext.Provider value={{ state: Object.freeze(state), dispatch }}>
            {children}
        </EstabelecimentoSelecionadoContext.Provider>
    )
}


export const useEstabelecimentoSelecionadoContext = () => {
    return React.useContext(EstabelecimentoSelecionadoContext)
}


