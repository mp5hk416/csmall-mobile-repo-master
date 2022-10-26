<template>
  <div>
    <!-- 标题栏 -->
    <van-sticky>
      <van-nav-bar title="支付订单" left-arrow @click-left="$router.go(-1)">
      </van-nav-bar>
    </van-sticky>

    <!-- 提交完成提示 -->
    <van-empty>
      <div class="empty-info">
        <p>订单提交成功</p>
        <p>
          请在
          <van-count-down
            class="count-down"
            :time="60 * 1000 * 60 * 2"
            format="HH 时 mm 分 ss 秒"
          />
          内完成支付
        </p>
        <p>
          应付金额：
          <span style="color: red"> ￥18188.00 </span>
        </p>
      </div>
    </van-empty>

    <!-- 支付方式 -->
    <div class="divider"></div>
    <van-divider>支付方式</van-divider>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell clickable @click="radio = '1'">
          <template #title>
            <van-icon
              name="wechat-pay"
              size="36px"
              color="rgb(7, 193, 96)"
              style="vertical-align: middle"
            />
            微信
          </template>
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell clickable @click="radio = '2'">
          <template #title>
            <van-icon
              name="alipay"
              size="36px"
              color="rgb(22, 119, 255)"
              style="vertical-align: middle"
            />
            支付宝
          </template>
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell clickable @click="radio = '3'">
          <template #title>
            <van-icon
              name="card"
              size="36px"
              color="black"
              style="vertical-align: middle"
            />
            银联
          </template>
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <div class="footer">
      <van-button type="danger" block round @click="handleSubmit"
        >确定</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "1",
    };
  },
  methods: {
    handleSubmit() {
      // 支付成功
      this.$router.push("/order/payorder-success");
    },
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
