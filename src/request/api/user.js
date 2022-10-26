/** user业务模块接口整合 */
import base from "./base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const SSO_BASEURL = base.SSO_BASEURL;
const UMS_BASEURL = base.UMS_BASEURL;

const userApi = {

  /**
   * 获取当前用户信息
   * Tip：该请求需要携带Token
   */
  getCurrentUser(){
    return axios.REQUEST_GET(SSO_BASEURL + "/user/info/sso/")
  },

  /**
   * 用户登录业务
   * @param {Object} params 
   */
  login(params){
    return axios.REQUEST_POST(SSO_BASEURL + "/user/sso/login", params);
  },

  /**
   * 用户注册业务
   * @param {Object} params 注册时所需的用户对象
   */
  regist(params) {
    return axios.REQUEST_POST(UMS_BASEURL + "/ums/user/register", params);
  },

  /**
   * 验证字段是否重复业务
   * @param {Object} params 
   */
  checkValue(params){
    return axios.REQUEST_POST(UMS_BASEURL + "/ums/user/checkValue", params);
  },

  /**
   * 获取图片验证码
   */
  getImageCode(){
    return axios.get(SSO_BASEURL + '/sso/valid/code', {
      responseType: 'blob'
    })
    // return axios.get('/favicon.ico', {
    //   responseType: 'blob'
    // })
  },


  /**
   * 发送请求，尝试获取短信验证码
   */
  sendSMS(params){
    return axios.REQUEST_GET(SSO_BASEURL + '/sso/phone/send/code', params)
  },

  /**
   * 用户手机验证登录业务
   * @param {Object} params 
   */
   loginByPhone(params){
    return axios.REQUEST_POST(SSO_BASEURL + "/sso/phone/login", params);
  },
  
};

export default userApi;
