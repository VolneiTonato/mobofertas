import { createAsyncThunk,  createSlice } from '@reduxjs/toolkit'
import { ServiceMobOfertasApi as Api } from '../../Services/MobOfertasApi'

const NAME = 'ProdutoSearchState'

const INITIALIZE_STATE = {
    data: [],
    loading: false,
    error: false,
    hasMore: false,
    noData: false,
    page: 1,
    owner: '',
    query: ''
}


const Pesquisar = createAsyncThunk(
    `${NAME}/PESQUISAR`,
    async (_, argsThunk) => {
        try {

            const currentState = argsThunk.getState().StateProdutoSearch

            const res = await Api.listProdutosByEstabelecimento(currentState.owner, currentState.query, { page: currentState.page })

            let data = res.response || []

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
        pageNext: (state) => {
            return { ...state, page: state.page + 1 }
        },
        pageReset: (state) => {
            return { ...state, page: 1 }
        }
    },
    extraReducers: {
        [Pesquisar.pending]: (state) => {
            return { ...state, loading: true, error: false }
        },
        [Pesquisar.fulfilled]: (state, { payload }) => {
            return { ...state, data: payload.data, hasMore: payload.pageNext, loading: false, noData: payload.data.length }
        },
        [Pesquisar.rejected]: (state) => {
            return { ...state, error: true, loading: false }
        }
    }
})


export const StateProdutoSearch = Reducer.reducer
export const ActionsProdutoSearch = { ...Reducer.actions, Pesquisar}