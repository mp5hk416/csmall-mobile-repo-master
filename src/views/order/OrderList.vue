<template>
  <div style="padding-bottom: 100px">
    <!-- 顶部导航 -->
    <van-sticky>
      <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)">
      </van-nav-bar>
    </van-sticky>
    <!-- 顶部滚动导航  -->
    <van-tabs v-if="orderList">
      <van-tab title="全部">
        <div class="orderlist-item" v-for="order,i in orderList" :key="i">
          <div class="divider"></div>
          <van-row class="title">
            <van-col span="16" style="text-align: left">
              &nbsp;&nbsp;订单编号：{{order.id}}
            </van-col>
            <van-col span="8" style="text-align: right">
              等待付款&nbsp;&nbsp;
            </van-col>
          </van-row>
          <van-divider></van-divider>
          <div class="product-item" v-for="orderItem, j in order.orderItems" :key="j">
            <van-card class="card" :price="orderItem.price" :thumb="orderItem.mainPicture">
              <template #title>
                <p
                  style="
                    width: 50vw;
                    font-size: 1.3em;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  "
                >
                  {{orderItem.title}}
                </p>
              </template>
              <template #num> 共{{orderItem.quantity}}件 </template>
            </van-card>
          </div>
          <van-divider></van-divider>
          <van-row class="footer">
            <van-col span="14"> &nbsp;&nbsp;应付金额：{{order.amountOfActualPay}}</van-col>
            <van-col span="10" style="text-align: right">
              <van-button
                type="danger"
                size="mini"
                plain
                style="vertical-align: middle"
                >取消订单</van-button
              >
              <van-button
                type="info"
                size="mini"
                plain
                style="vertical-align: middle"
                >立即付款</van-button
              >
              &nbsp;&nbsp;
            </van-col>
          </van-row>
        </div>
      </van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="已完成"></van-tab>
      <van-tab title="已取消"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {

  data(){
    return {
      orderList : null
    }
  },

  mounted(){
    // 加载当前用户的订单列表
    this.loadOrderList()
  },

  methods: {
    // 加载当前用户的订单列表
    loadOrderList(){
      let params = {page:1, pageSize: 100}
      this.$api.orderApi.listOrder(params).then(res=>{
        console.log('加载订单列表', res)
        if(res.data.state==200){
          this.orderList = res.data.data.list
        }else{
          this.$toast('系统异常，请稍后再试')
        }
      })
    }
  },
};
</script>

<style scoped>
/** 自定义分割线 */
.divider {
  height: 15px;
  background: #eee;
}

/** 订单列表项样式 */
.orderlist-item .title,
.orderlist-item .footer {
  margin: 10px 0px;
  color: #666;
}
.orderlist-item .product-item {
  margin-bottom: 3px;
}
</style>
