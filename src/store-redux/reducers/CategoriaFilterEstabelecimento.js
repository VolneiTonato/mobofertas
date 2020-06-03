import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ServiceCategoriaEstabelecimento as Api } from '../../Services/MobOfertasApi/CategoriasEstabelecimentos'
import { clone as cloneObject } from 'lodash'
const NAME = 'CategoriaFilterEstabelecimento'

const INITIALIZE_STATE = {
    data: [],
    loading: false,
    error: false,
    itensSelected: [],
    cacheItensSelected: [],
    noData: false,
    isClear: false
}

const Pesquisar = createAsyncThunk(
    `${NAME}/PESQUISAR`,

    async () => {

        try {

            let res = await Api.listCategoriasPrincipais()

            let data = res.data || []

            return { data, pageNext: res.pageNext, page: res.page }
        } catch (err) {
            throw err
        }
    }
)

const Reducer = createSlice({
    name: NAME,
    initialState: INITIALIZE_STATE,
    reducers: {
        updateState: (state, { payload }) => {
            return { ...state, ...payload }
        },
        changeItemSelectedCache: (state, {payload}) => {

            let cacheItens = []

            if (state.isClear === false && state.itensSelected.length > 0 && state.cacheItensSelected.length === 0)
                cacheItens = cloneObject(state.itensSelected)

            if (cacheItens.length === 0)
                cacheItens = cloneObject(state.cacheItensSelected)



            if (cacheItens.includes(payload))
                cacheItens = cacheItens.filter(prev => prev !== payload)
            else
                cacheItens.push(payload)


            

            let isClear = cacheItens.length === 0

            return { ...state, isClear: isClear, cacheItensSelected: cacheItens }

        },

        aplicarFiltros: (state) => {

            let itens = []

            let isClear = state.isClear

            if (isClear === false) {
                itens = cloneObject(state.cacheItensSelected)

                console.log(itens)

                if (isClear === false && state.itensSelected.length > 0 && state.cacheItensSelected.length === 0)
                    itens = cloneObject(state.itensSelected)

            }

            return { ...state, itensSelected: itens, cacheItensSelected: itens, isClear: false }
        },
        clearFilters: (state) => {
            return { ...state, cacheItensSelected: [], isClear: true }
        }
    },
    extraReducers: {
        [Pesquisar.pending]: (state) => {
            return { ...state, loading: true, error: false }
        },
        [Pesquisar.fulfilled]: (state, { payload }) => {
            return { ...state, loading: false, error: false, data: payload.data, noData: payload.data.length, cacheItensSelected: [], isClear: false }
        },
        [Pesquisar.rejected]: (state) => {
            return { ...state, loading: false, error: true }

        }
    }

})


export const StateCategoriaFilterEstabelecimento = Reducer.reducer
export const ActionsCategoriaFilterEstabelecimento = { ...Reducer.actions, Pesquisar}