import ENV from '../../../env'
import CONFIG from './index'
const CURRENT = CONFIG[ENV.CURRENT]

export default {
    // 保存产品
    saveProduct:CURRENT.baseUrl + '/product/save',
    // 获取产品
   getProduct:CURRENT.baseUrl + '/product/find',
}