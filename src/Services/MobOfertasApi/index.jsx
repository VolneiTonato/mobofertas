import {Api} from './config'
import axios from 'axios'

export const ServiceMobOfertasApi = ({

    listEstabelecimentos: async (query, opt = {page:1}) => {
        return new Promise(async (resolve, reject) => {
            try {

                opt.page = opt.page || 1

                let urlToString = `/estabelecimentos/list?page=${opt.page}`

                if(query)
                    urlToString = `${urlToString}&q=${query}`


                const { data } = await Api.get(`${urlToString}`)

                resolve(data)
            } catch (err) {
                
                if(axios.isCancel(err))return

                reject(err)
            }
        })
    },

    listTabloidesByEstabelecimento: async (owner, opt = {page:1}) => {
        return new Promise(async (resolve, reject) => {
            try{
                const {data} = await Api.get(`/tabloides/list/${owner}?page=${opt.page}`)

                resolve(data)
            }catch(err){
                if(axios.isCancel(err))return
                reject(err)
            }
        })
    },

  


    listProdutosByEstabelecimento: async (owner, query, opt = {page:1}) => {
        return new Promise(async (resolve, reject) => {
            try{
                opt.page = opt.page || 1

                let urlToString = `/produtos/list/${owner}?page=${opt.page}`

                if(query)
                    urlToString = `${urlToString}&q=${query}`

                const {data} = await Api.get(`${urlToString}`)

                resolve(data)
            }catch(err){
                if(axios.isCancel(err))return
                reject(err)
            }
        })
    }
})