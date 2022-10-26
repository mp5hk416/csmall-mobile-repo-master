<template>
  <div>
    <!-- 标题栏 -->
    <van-sticky>
      <van-nav-bar title="支付成功" left-arrow  @click-left="$router.go(-1)"> </van-nav-bar>
    </van-sticky>

    <!-- 提交完成提示 -->
    <van-empty>
      <div class="empty-info">
        <p>订单支付成功</p>
        <p>
          支付金额：
          <span style="color: red"> ￥18188.00 </span>
        </p>
      </div>
    </van-empty>

    <van-row>
      <van-col :span="10" style="text-align: right">
        <van-button type="info" plain @click="$router.push('/order/orderlist')">查看订单</van-button>
      </van-col>
      <van-col :span="4" style="text-align: left"> </van-col>
      <van-col :span="10" style="text-align: left">
        <van-button type="info" plain @click="$router.push('/home/index')">返回首页</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
    };
  },
};
</script>

<style scoped>
/** 自定义分割线 */
.divider {
  height: 15px;
  background: #eee;
}

/** 空状态样式 */
.empty-info {
  font-size: 0.9em;
  color: #999;
  text-align: center;
}

.empty-info .count-down {
  display: inline;
  color: #999;
}

/** 页脚按钮 */
.footer {
  padding: 0px 20px;
}
</style>
