import Vue from "vue"
import Vuex from "vuex"
import LocalStorage from '@/common/StorageUtils'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 保存token信息
    tokenInfo: LocalStorage.get(LocalStorage.KEY_TOKEN_INFO),  // 存储token字符串
    userInfo: LocalStorage.get(LocalStorage.KEY_USER_INFO),   // 存储用户信息


    // 保存购物车信息
    cartInfo: LocalStorage.get(LocalStorage.KEY_CART_INFO),   // 存储购物车信息

    // 保存秒杀商品信息
    seckillSkuInfo: {}
  },

  getters: {
    getCartInfo(state){
      return state.cartInfo
    },

    getSeckillSkuInfo(state){
      return state.seckillSkuInfo
    }
  },

  mutations: {

    /**
     * 添加秒杀商品
     * @param {*} state 
     * @param {*} skuInfo 
     */
     saveSeckillSkuInfo(state, skuInfo){
      // 已存在，数量+1， 否则新增购物项
      state.seckillSkuInfo = skuInfo
    }, 


    /**
     * 存储用户信息
     * @param {*} state 
     * @param {*} userInfo 
     */
    updateUserInfo(state, userInfo){
      state.userInfo = userInfo
      LocalStorage.save(LocalStorage.KEY_USER_INFO, userInfo)
    },

    /**
     * 保存token信息到state与LocalStorage
     * @param {*} state 
     * @param {*} tokenInfo 
     */
    saveToken(state, tokenInfo){
      state.tokenInfo = tokenInfo
      LocalStorage.save(LocalStorage.KEY_TOKEN_INFO, tokenInfo) 
    },

    /**
     * 修改购物项数量
     * @param {*} state 
     * @param {*} payload 
     */
    updateCartItemQuantity(state, payload){
      let {skuId, num} = paylaod
      state.cartInfo.forEach(item=>{
        if(item.skuId == skuId){
          item.quantity = num
          LocalStorage.save(LocalStorage.KEY_CART_INFO, state.cartInfo)
          return;
        }
      })
    },

    /**
     * 删除购物项
     * @param {*} state 
     * @param {*} skuId 
     * @returns 
     */
    removeCartItem(state, skuId){
      for (let i=0; i<state.cartInfo.length; i++){
        if(state.cartInfo[i].skuId==skuId) {
          state.cartInfo.splice(i, 1)
          LocalStorage.save(LocalStorage.KEY_CART_INFO, state.cartInfo)
          return;
        }
      }
    },

    /**
     * 添加购物项
     * @param {*} state 
     * @param {*} cartItem 
     */
    addCartItem(state, cartItem){
      // 已存在，数量+1， 否则新增购物项
      state.cartInfo.forEach(item=>{
        if(item.skuId == cartItem.skuId){
          item.quantity++
          LocalStorage.save(LocalStorage.KEY_CART_INFO, state.cartInfo)
          return;
        }
      })
      state.cartInfo.push(cartItem)
      LocalStorage.save(LocalStorage.KEY_CART_INFO, state.cartInfo)
    }, 

    /**
     * 清空购物车
     */
    clearCart(state){
      state.cartInfo = []
    }
  },

  actions: {},

  modules: {},
});
