import { ACTIONS } from '../Constants/actions'

export default function CategorieFilterEstabelecimentoReducer(state, { type, payload }) {

    switch (type) {

        case "CATEGORIES_FILTER_AFTER_FETCH_LIST":
            return { ...state, data: payload.data, error: false, loading: false }

        case "CATEGORIES_FILTER_APPLY_SELECTED":
            return { ...state, filterQuery: { itens: payload, isClear: false } }

        case "CATEGORIES_FILTER_LOADING":
            return { ...state, loading: true, error: false, data: [] }

        case "CATEGORIES_FILTER_CLEAR_SELECTED":
            return { ...state, filterQuery: { itens: [], isClear: true } }


        default:
            return state
    }
}
