/** user业务模块接口整合 */
import base from "./base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const SSO_BASEURL = base.SSO_BASEURL;
const UMS_BASEURL = base.UMS_BASEURL;
const SECKILL_BASEURL = base.SECKILL_BASEURL;

const seckillApi = {
  /**
   * 查询秒杀SPU列表
   * @param {Object} params 封装分页相关。例如: {page:1, pageSize:6}
   */
  querySpuList(params) {
    return axios.REQUEST_GET(SECKILL_BASEURL + "/seckill/spu/list", params);
  },

  /**
   * 根据ID，查询秒杀SPU包含属性列表
   * @param {Object} params
   */
  querySkuListBySpuId(params) {
    return axios.REQUEST_GET(
      SECKILL_BASEURL + `/seckill/sku/list/${params.spuId}`
    );
  },

  /**
   * 根据ID，查询秒杀SPU详情描述
   * @param {Object} params
   */
  queryDetailById(params) {
    return axios.REQUEST_GET(
      SECKILL_BASEURL + `/seckill/spu/${params.spuId}/detail`
    );
  },

  /**
   * 根据ID，查询秒杀SPU信息
   * @param {Object} params
   */
  queryById(params) {
    return axios.REQUEST_GET(SECKILL_BASEURL + `/seckill/spu/${params.spuId}`);
  },

  /** 
   * 提交秒杀订单
   * @param {Object}  params  
   */
  saveSeckillOrder(params) {
    return axios.REQUEST_POST(SECKILL_BASEURL + params.url, params)
  },
};

export default seckillApi;
