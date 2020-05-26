import {ACTIONS} from '../Constants/actions'

export default function EstabelecimentoSearchReducer(state, action) {

    switch (action.type) {


        case ACTIONS.ESTABELECIMENTO_SEARCH.LIST_ITENS:
            return { ...state, data: action.payload, loading: false, error: false, hasMore: action.hasMore, noData: action.noData }

        case ACTIONS.ESTABELECIMENTO_SEARCH.LOADING:
            return { ...state, loading: true }

        case ACTIONS.ESTABELECIMENTO_SEARCH.RESET_PAGE:
            return { ...state, page: 1, data: [] }

        case ACTIONS.ESTABELECIMENTO_SEARCH.CHANGE_PAGE:
            return { ...state, page: state.page + 1 }

        case ACTIONS.ESTABELECIMENTO_SEARCH.RESET_PAGE_AND_DATA:
            return { ...state, page: 1, data: [] }

        case ACTIONS.ESTABELECIMENTO_SEARCH.CHANGE_QUERY:
            return { ...state, data: [], page: 1, query: action.payload }

        case ACTIONS.ESTABELECIMENTO_SEARCH.CHANGE_PAGE_QUERY:

            return { ...state, loading: true, error: false }
        default:
            return state
    }

}
