import { combineReducers } from '@reduxjs/toolkit'

import { StateEstabelecimentoSelected } from './EstabelecimentoSelected'
import { StateEstabelecimentoSearch }  from './EstabelecimentoSearch'
import { StateCategoriaFilterEstabelecimento } from './CategoriaFilterEstabelecimento'
import { StateProdutoSearch } from './ProdutoSearch'

export default combineReducers(
    {
        StateEstabelecimentoSelected,
        StateEstabelecimentoSearch,
        StateCategoriaFilterEstabelecimento,
        StateProdutoSearch
    }
)