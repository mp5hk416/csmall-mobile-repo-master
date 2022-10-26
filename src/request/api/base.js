/**
 * 接口域名的管理
 */
const base = {    
    BASEURL_DEV: {                                      // 测试环境下的请求域名前缀
        PMS_BASEURL: 'http://localhost:9010',           // 后台管理服务请求域名前缀
        SSO_BASEURL: 'http://localhost:10002',          // 单点登录服务请求域名前缀
        FRONT_BASEURL: 'http://localhost:10004',          // 前台服务请求域名前缀
        UMS_BASEURL: 'http://localhost:10006',          // 用户管理服务请求域名前缀
        SECKILL_BASEURL: 'http://localhost:10007',          // 秒杀服务请求域名前缀
        ORDER_BASEURL: 'http://localhost:10005',          // 订单服务请求域名前缀
        SEARCH_BASEURL: 'http://localhost:10008',          // 搜索服务请求域名前缀
        
    },       
    BASEURL_PRODUCT: {                                  // 生产环境下的请求域名前缀
        PMS: 'http://212.11.156.22',    
    }
}

// 导出开发模式下的URL配置对象
export default base.BASEURL_DEV;