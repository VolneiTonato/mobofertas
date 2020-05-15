import { useEffect, useState } from 'react'
import { ServiceMobOfertasApi } from '../../Services/MobOfertasApi'

export const useEstabelecimentoSearchScroll = (query, page) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [estabelecimentos, setEstabelecimentos] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setEstabelecimentos([])
    }, [query])


    const pesquisar = async (query, page) => {
        return new Promise(async (resolve, reject) => {

            try {
                await ServiceMobOfertasApi.listEstabelecimentos(query, {page})
                    .then((data) => {

                        let response = data?.response || []

                        setEstabelecimentos(prevEstabelecimentos => {
                            return [...new Set([...prevEstabelecimentos, ...response])]
                        })

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

        pesquisar(query, page)


    }, [query, page])

    return {loading, error, estabelecimentos, hasMore}
}