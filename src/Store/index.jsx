import {combineComponents} from './combine'

import {CategorieFilterEstabelecimentoProvider} from '../Context/CategorieFilterEstabelecimentoContext'
import {EstabelecimentoSearchProvider} from '../Context/EstabelecimentoSearchContext'

export const AppContextProviderState = combineComponents(
    CategorieFilterEstabelecimentoProvider,
    EstabelecimentoSearchProvider
)