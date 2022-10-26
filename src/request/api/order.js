/** user业务模块接口整合 */
import base from "./base"; // 导入接口域名列表
import axios from "../http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const SSO_BASEURL = base.SSO_BASEURL;
const UMS_BASEURL = base.UMS_BASEURL;
const FRONT_BASEURL = base.FRONT_BASEURL;
const SECKILL_BASEURL = base.SECKILL_BASEURL;
const ORDER_BASEURL = base.ORDER_BASEURL;

const orderApi = {

  /**
   * 查询订单列表
   * @param {Object} params {page:1, pageSize:10, startTime:xx, endTime}
   */
  listOrder(params){
    return axios.REQUEST_GET(ORDER_BASEURL + `/oms/order/list`, params)
  },

  /**
   * 添加订单
   * @param {Object} params 订单详情
   */
  addOrder(params){
    return axios.REQUEST_POST(ORDER_BASEURL + "/oms/order/add", params);
  },

  /**
   * 添加购物项到购物车
   * @param {Object} params 封装购物项对象
   */
  addToCart(params){
    return axios.REQUEST_POST(ORDER_BASEURL + "/oms/cart/add", params);
  },

  /**
   * 删除购物项
   * @param {Object} params 封装购物项的ids作为参数  {ids: 1}
   */
   deleteCartItem(params){
    return axios.REQUEST_POST(ORDER_BASEURL + "/oms/cart/delete/", params);
  },

  /**
   * 清空购物车
   */
   clearCart(){
    return axios.REQUEST_POST(ORDER_BASEURL + "/oms/cart/delete/all");
  },
  
  /**
   * 查询当前用户的购物车
   * @param {Object} params  封装请求参数：  {page:1, pageSize:10}
   */
   queryCart(params){
    return axios.REQUEST_GET(ORDER_BASEURL + "/oms/cart/list");
  },
  
  /**
   * 更新购物项的购买数量
   * @param {Object} params  封装请求参数：{id:1, quantity:10}
   */
   updateCartItemQuantity(params){
    return axios.REQUEST_POST(ORDER_BASEURL + "/oms/cart/update/quantity", params);
  },
  
};

export default orderApi;
