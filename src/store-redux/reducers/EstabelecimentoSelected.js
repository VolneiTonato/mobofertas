import { createSlice } from '@reduxjs/toolkit'

const NAME = 'estabelecimenoSelectedState'

const INITIALIZE_STATE = {
    item: {},
}

const Reducer = createSlice({
    name: `${NAME}`,
    initialState: INITIALIZE_STATE,
    reducers: {
        updateState: (state, { type, payload }) => {
            return { ...state, ...payload }
        },
    }
})


export const StateEstabelecimentoSelected = Reducer.reducer
export const ActionsEstabelecimentoSelected = Reducer.actions

