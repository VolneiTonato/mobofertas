import {Api} from './config'
import axios from 'axios'


export const ServiceCategoriaEstabelecimento = ({
    listCategoriasPrincipais : () => {
        return new Promise(async (resolve, reject) => {
            try{
                const {data} = await Api.get(`/categorias/list`)

                resolve(data)
            }catch(err){
                if(axios.isCancel(err))return
                reject(err)
            }
        })
    }
})