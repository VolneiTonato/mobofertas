import {createSlice, createAction, createAsyncThunk} from '@reduxjs/toolkit'
import { ServiceMobOfertasApi as Api } from '../../Services/MobOfertasApi'

const NAME = 'EstabelecimentoSearchState'

const INITIALIZE_STATE = {
    data: [],
    hasMore: false,
    loading: false,
    error: false,
    noData: false,
    query: '',
    categories: [],
    page: 1
}

const Pesquisar = createAsyncThunk(
    `${NAME}/PESQUISAR`, 
    async (_, argsThunk) => {   

        try{

            const currentState = argsThunk.getState().StateEstabelecimentoSearch

            let res = await Api.listEstabelecimentos(currentState.query, currentState.categories, { page: currentState.page })

            let data = res.response || []

            return {data, pageNext: res.pageNext, page : res.page }
        }catch(err){
            throw err
        }
    }
)


const Reducer = createSlice({
    name: NAME,
    initialState: INITIALIZE_STATE,
    reducers: {
        updateState: (state, {payload}) => {
            return {...state, ...payload}
        },
        pageNext: (state) => {
            return {...state, page: state.page + 1}
        }
    },
    extraReducers: {
        [Pesquisar.pending]: (state) => {
            return {...state, loading: true, error:false}
        },
        [Pesquisar.fulfilled]: (state, {payload}) => {
            return {...state, loading: false, error: false, data: payload.data, noData : payload.data.length === 0, hasMore: payload.pageNext}
        },
        [Pesquisar.rejected]: (state) => {
            return {...state, loading: false, error: true}

        }
    }

})

export const StateEstabelecimentoSearch = Reducer.reducer
export const ActionsEstabelecimentoSearch = { ...Reducer.actions, Pesquisar}