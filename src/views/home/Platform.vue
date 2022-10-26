<template>
  <div>
    <div class="panel-top">
      <div class="userinfo">
        <van-image
          width="60px"
          height="60px"
          round
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="nameinfo">
            <p v-if="$store.state.userInfo">
              {{$store.state.userInfo.nickname}}
              <a style="font-size:0.8em;" href="javascript:;" @click="logout">[注销]</a>
            </p>
            <p v-else @click="$router.push('/user/login')">点击登录</p>
            <van-tag type="primary" color="#111" text-color="#ff0">黄金会员</van-tag>
        </div>
      </div>
      <div class="tabs">
          <div class="tab">
              <p class="name">积分</p>
              <p class="value">100</p>
          </div>
          <div class="tab">
              <p class="name">优惠券</p>
              <p class="value">100</p>
          </div>
          <div class="tab">
              <p class="name">收藏夹</p>
              <p class="value">100</p>
          </div>
          <div class="tab">
              <p class="name">浏览足迹</p>
              <p class="value">100</p>
          </div>
      </div>
    </div>
    <div class="panel-container">
      <!-- 我的订单开始 -->
      <div class="panel" @click="$router.push('/order/orderlist')">
        <p>我的订单</p>
        <div class="divider" />
        <van-grid square :column-num="5" :border="false">
          <van-grid-item :icon="require('@/assets/icon_daifukuan.png')" text="代付款" />
          <van-grid-item :icon="require('@/assets/icon_daifahuo.png')" text="待发货" />
          <van-grid-item :icon="require('@/assets/icon_daishouhuo.png')" text="待收货" />
          <van-grid-item :icon="require('@/assets/icon_pingjia.png')" text="评价" />
          <van-grid-item :icon="require('@/assets/icon_tuikuan.png')" text="退款售后" />
        </van-grid>
      </div>
      <!-- 我的订单结束 -->

      <!-- 种草开始 -->
      <div class="panel">
        <p>种草</p>
        <div class="divider" />
        <van-grid square :column-num="4" :border="false">
          <van-grid-item text="收藏" icon="like" >
          </van-grid-item>
          <van-grid-item :icon="require('@/assets/icon_xinpin.png')" text="新品" />
          <van-grid-item :icon="require('@/assets/icon_zhuanti.png')" text="专题" />
          <van-grid-item :icon="require('@/assets/icon_huati.png')" text="话题" />
        </van-grid>
      </div>
      <!-- 种草结束 -->

      <van-cell-group class="panel">
        <van-cell title="地址管理" is-link/>
        <van-cell title="评价管理" is-link/>
        <van-cell title="会员管理" is-link/>
      </van-cell-group>

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * 退出登录
     */
    logout(){
      localStorage.clear()
      this.$router.push('/user/login')
    }
  }
}
</script>

<style scoped>

/* 顶部用户信息部分样式 */
.panel-top {
  padding-top: 20px;
  height: 150px;
  background-image: linear-gradient(
    10 10 -90deg,
    rgb(125, 204, 236) 0%,
    rgb(20, 159, 219) 100%
  );
  background-image: -webkit-linear-gradient(
    -90deg,
    rgb(125, 204, 236) 0%,
    rgb(20, 159, 219) 100%
  );
}

.panel-top .userinfo {
    display: flex;
    margin: 20px;
}

.panel-top .userinfo .nameinfo {
    margin-top: 8px;
    margin-left: 15px;
}

.panel-top .tabs {
    display: flex;
    margin-top: 10px;
}

.panel-top .tabs .tab{
    width: 25%;
    text-align: center;
}

.panel-top .tabs .tab .value {
    color: rgb(94, 224, 224);
}

/* 面板样式 */
.panel-container {
  padding: 10px 10px 70px 10px; 
  background-color: rgb(213,238,249);
}

.panel-container .panel {
  border-radius: 10px;
  background: #fff;
  padding: 10px;
  margin-top: 10px;
}

.panel-container .panel p{
  font-weight: normal;
  padding-left: 10px;
}

.panel-container .panel .divider{
  border-bottom: 1px solid #ddd;
  margin: 10px 0px;
}

</style>
