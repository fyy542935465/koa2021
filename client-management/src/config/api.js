import ENV from '../../env'
import CONFIG from './index'
console.log(ENV)
const CURRENT = CONFIG[ENV.CURRENT]

export default {
    // 保存产品
    saveProduct:CURRENT.baseUrl + 'product/save',
}