import ENV from '../../../env'
import CONFIG from './index'
const CURRENT = CONFIG[ENV.CURRENT]
const url = CURRENT.baseUrl
export default {
    sign:url + 'sign',
    // 保存产品、编辑产品
    saveProduct:url + 'product/save',
    // 获取产品列表
    getProduct:url + 'product/find',
    // 根据id获取产品详情
    findProductById:(id) => url + 'product/findByid/' + id,
    // 根据id删除产品
    delProductById:(id) => url + 'product/delete/' + id,
    // 保存产品、编辑新闻动态
    saveNews:url + 'news/save',
    // 获取新闻列表
    getNews:url + 'news/find',
    // 根据id获取新闻详情
    findNewsById:(id) => url + 'news/findByid/' + id,
    // 根据id删除产品
    delNewsById:(id) => url + 'news/delete/' + id,
    // 查询关于
    findAbout:url + 'about/find',
    // 保存关于
    saveAbout:url + 'about/save'
}