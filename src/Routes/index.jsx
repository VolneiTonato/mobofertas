import React from 'react'
import { BrowserRouter} from 'react-router-dom'
import { RouterNavigationBottomPrimary } from './router-navigation-bottom-primary'
const Router = (props) => {
    return (
        <BrowserRouter>
            <RouterNavigationBottomPrimary {...props} />

        </BrowserRouter>
    )
}

export default Router