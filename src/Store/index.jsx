import { combineComponents } from './combine'


import { CategorieFilterEstabelecimentoProvider } from '../Context/CategorieFilterEstabelecimentoContext'
import { EstabelecimentoSearchProvider } from '../Context/EstabelecimentoSearchContext'
import { ProdutoSearchProvider } from '../Context/ProdutoSearchContext'
import { EstabelecimentoSelecionadoProvider } from '../Context/EstabelecimentoSelecionadoContext'

export const MasterProvider = combineComponents(
    CategorieFilterEstabelecimentoProvider,
    EstabelecimentoSearchProvider,
    EstabelecimentoSelecionadoProvider,
    ProdutoSearchProvider
)
