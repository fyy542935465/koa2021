import ENV from '../../../env'
import CONFIG from './index'
const CURRENT = CONFIG[ENV.CURRENT]
const url = CURRENT.baseUrl
export default {
    // 保存产品、编辑产品
    saveProduct:url + 'product/save',
    // 获取产品列表
    getProduct:url + 'product/find',
    // 根据id获取产品详情
    findProductById:(id) => url + 'product/findByid/' + id,
    // 根据id获取新闻详情
    findNewsById:(id) => url + 'news/findByid/' + id,
}