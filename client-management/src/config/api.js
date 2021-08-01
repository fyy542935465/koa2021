import ENV from '../../../env'
import CONFIG from './index'
const CURRENT = CONFIG[ENV.CURRENT]
const url = CURRENT.baseUrl
export default {
    // 保存产品
    saveProduct:url + 'product/save',
    // 获取产品列表
    getProduct:url + 'product/find',
    // 编辑产品
    findProductById:(id) => url + 'product/findByid/' + id,
    // 编辑产品
    findNewsById:(id) => url + 'product/findByid/' + id,
}