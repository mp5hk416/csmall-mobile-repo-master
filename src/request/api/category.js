/** user业务模块接口整合 */
import base from "./base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const SSO_BASEURL = base.SSO_BASEURL;
const UMS_BASEURL = base.UMS_BASEURL;
const FRONT_BASEURL = base.FRONT_BASEURL;
const SECKILL_BASEURL = base.SECKILL_BASEURL;

const categoryApi = {

  /**
   * 查询类别列表
   */
  queryAll(){
    return axios.REQUEST_GET(FRONT_BASEURL+"/front/category/all")
  }

};

export default categoryApi;
