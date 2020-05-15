import { useEffect, useState } from 'react'
import { ServiceMobOfertasApi } from '../../Services/MobOfertasApi'


export const useProdutosSearchScroll = (owner, query,  page) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [products, setProdutcts] = useState([])
    const [hasMore, setHasMore] = useState(false)


    useEffect(() => {
        setProdutcts([])
    }, [owner])

    useEffect(() => {
        setProdutcts([])
    }, [query])

    const pesquisarProduct = async (owner, query,  page) => {
        return new Promise(async (resolve, reject) => {

            try {
                await ServiceMobOfertasApi.listProdutosByEstabelecimento(owner, query, { page })
                    .then((data) => {

                        let response = data?.response || []

                        setProdutcts(prevProdutcts => [...prevProdutcts, ...response])

                        setHasMore(response.length > 0)

                        resolve()

                    }).finally(ok => {

                        setLoading(false)

                    })

            } catch (err) {
                setError(true)

                reject(err)
            }
        })
    }


    useEffect(() => {

        setLoading(true)
        setError(false)

        pesquisarProduct(owner, query, page)


    }, [owner, page, query])

    return { loading, error, products, hasMore }
}