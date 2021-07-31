import axios from 'axios'
export default {
    get:(url,params,callback) => {
        return axios.get(url,{
            params:params
        }).then(res => {
            callback && callback(res.data)
        }).catch(err => {
            console.log(err)
        })
    },
    post:(url,params,callback,config) => {
        return axios.post(url,params,config).then(res => {
            callback && callback(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
}