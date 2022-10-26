/** user业务模块接口整合 */
import base from "./base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const SSO_BASEURL = base.SSO_BASEURL;
const UMS_BASEURL = base.UMS_BASEURL;
const FRONT_BASEURL = base.FRONT_BASEURL;
const SECKILL_BASEURL = base.SECKILL_BASEURL;
const SEARCH_BASEURL = base.SEARCH_BASEURL;

const spuApi = {

  /**
   * 根据分类ID查询spu列表
   * @param {Object} params 请求参数。
   * 示例：{categoryId: 1, page:1, pageSize:10}
   */
  querySpuListByCategoryId(params){
    return axios.REQUEST_GET(FRONT_BASEURL + `/front/spu/list/${params.categoryId}`, params)
  },

  /**
   * 根据SpuId，查询SPU信息
   * @param {Object} params {id: 2}
   */
  queryById(params){
    return axios.REQUEST_GET(FRONT_BASEURL + `/front/spu/${params.id}`)
  },

  /**
   * 根据SpuId，查询SPU详情
   * @param {Object} params {id: 2}
   */
   queryDetailById(params){
    return axios.REQUEST_GET(FRONT_BASEURL + `/front/spu/detail/${params.id}`)
  },

  /**
   * 根据SpuId，查询SPU所有属性
   * @param {Object} params {spuId: 2}
   */
   queryAllAttributesBySpuId(params){
    return axios.REQUEST_GET(FRONT_BASEURL + `/front/spu/template/${params.spuId}`)
  },
  
  /**
   * 根据关键字查询spu列表
   * @param {Object} params {keyword: '', page:1, pageSize:10}
   */
  querySpuListByKeyword(params){
    return axios.REQUEST_GET(SEARCH_BASEURL + `/search`, params)
  }
  
};

export default spuApi;
