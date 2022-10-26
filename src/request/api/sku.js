/** user业务模块接口整合 */
import base from "./base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const SSO_BASEURL = base.SSO_BASEURL;
const UMS_BASEURL = base.UMS_BASEURL;
const FRONT_BASEURL = base.FRONT_BASEURL;
const SECKILL_BASEURL = base.SECKILL_BASEURL;

const skuApi = {

  /**
   * 根据SPUID查询sku列表
   * @param {Object} params 请求参数。
   * 示例：{spuId: 1}
   */
  querySkuListBySpuId(params){
    return axios.REQUEST_GET(FRONT_BASEURL+`/front/sku/${params.spuId}`)
  }

};

export default skuApi;
