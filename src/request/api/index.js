/** api接口的统一出口 */
import userApi from './user.js'
import seckillApi from './seckill.js'
import categoryApi from './category.js'
import spuApi from './spu.js'
import skuApi from './sku.js'
import orderApi from './order.js'

// 将各业务模块接口导出
export default {    
    userApi,
    seckillApi,
    categoryApi,
    spuApi,
    skuApi,
    orderApi
    // ……
}