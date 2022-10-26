<template>
  <div>
    <!-- 标题栏 -->
    <van-sticky>
      <van-nav-bar title="确认订单" left-arrow @click-left="$router.go(-1)">
      </van-nav-bar>
    </van-sticky>
    <!-- 联系人卡 -->
    <van-contact-card
      type="edit"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="$router.push('/order/addresslist')"
    />
    <!-- 自定义分割线 -->
    <div class="divider"></div>
    <van-divider>商品信息</van-divider>

    <van-card
      class="card"
      :price="(item.price).toFixed(2)"
      :thumb="item.mainPicture"
      v-for="(item, index) in orderItems"
      :key="index"
      :num="item.quantity"
    >
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
          {{ item.title }}{{ item.title }}{{ item.title }}{{ item.title }}
        </p>
      </template>
      <template #tags>
        <van-tag type="danger">自营</van-tag>
      </template>
    </van-card>

    <!-- 自定义分割线 -->
    <div class="divider"></div>
    <van-divider>基本信息</van-divider>

    <div class="orderinfo-panel">
      <van-row class="row">
        <van-col :span="8" class="orderinfo-label">商品总金额</van-col>
        <van-col :span="16" class="orderinfo-value"
          >￥ {{ (orderPrice/100).toFixed(2) }}</van-col
        >
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="orderinfo-label">运费</van-col>
        <van-col :span="16" class="orderinfo-value">
          <van-tag type="danger">免运费</van-tag>
          ￥ 0.00
        </van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="orderinfo-label">优惠券</van-col>
        <van-col :span="16" class="orderinfo-value">无可用</van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="orderinfo-label">优惠金额</van-col>
        <van-col :span="16" class="orderinfo-value">-￥ 0.00</van-col>
      </van-row>
      <van-row class="row">
        <van-col :span="8" class="orderinfo-label">支付方式</van-col>
        <van-col :span="16" class="orderinfo-value">在线支付</van-col>
      </van-row>
    </div>
    <div class="divider"></div>
    <div class="divider"></div>
    <div class="divider"></div>
    <div class="divider"></div>

    <van-submit-bar
      :price="orderPrice"
      button-text="提交订单"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import LocalStorage from "@/common/StorageUtils";
import { Dialog } from 'vant';

export default {
  data() {
    return {
      currentContact: {
        name: "张三",
        tel: "13000000000",
      },
    };
  },
  computed: {
    ...mapGetters({ cartInfo: "getCartInfo" }),
    orderItems() {
      let indexs = this.$route.query.indexs;
      if (!indexs) {
        return [];
      }
      let indexAry = indexs.split(",");
      let orderItems = [];
      for (let i = 0; i < indexAry.length; i++) {
        orderItems.push(this.cartInfo[indexAry[i]]);
      }
      return orderItems;
    },
    orderPrice() {
      let totalPrice = 0;
      this.orderItems.forEach((item) => {
        totalPrice += item.quantity * item.price;
      });
      return totalPrice * 100;
    },
  },

  methods: {
    /**
     *  订单提交
     */
    handleSubmit() {
      console.log("确认订单");
      // 整理订单完整表单，发送添加订单请求
      let params = {};
      params.cityCode = "110100";
      params.cityName = "北京市";
      params.contactName = "张三";
      params.detailedAddress = "北京市海淀区北三环西路中鼎大厦B座";
      params.districtCode = "110100";
      params.districtName = "海淀区";
      params.mobilePhone = "13314566544";
      params.paymentType = 1;
      params.provinceCode = "010";
      params.provinceName = "北京市";
      params.streetCode = "11000";
      params.streetName = "北三环西路";
      params.telephone = "13314566544";
      params.amountOfDiscount = 0;
      params.amountOfFreight = 0;
      params.amountOfOriginalPrice = this.orderPrice / 100;
      params.amountOfActualPay =
        params.amountOfOriginalPrice +
        params.amountOfFreight -
        params.amountOfDiscount;
      let indexs = this.$route.query.indexs;
      if (!indexs) {
        return;
      }
      indexs.split(",").forEach((index, i) => {
        let item = this.cartInfo[index];
        params[`orderItems[${i}].skuId`] = item.skuId;
        params[`orderItems[${i}].barCode`] = "";
        params[`orderItems[${i}].data`] = item.data;
        params[`orderItems[${i}].mainPicture`] = "mainpicture";
        params[`orderItems[${i}].price`] = item.price;
        params[`orderItems[${i}].quantity`] = item.quantity;
        params[`orderItems[${i}].title`] = item.title;
      });
      params.state = 0;
      params.userId = LocalStorage.get(LocalStorage.KEY_USER_INFO).userId;
      console.log("下订单整理的参数", params);
      // 发送http请求，添加订单
      this.$api.orderApi.addOrder(params).then((res) => {
        console.log("订单添加结果", res);
        if(res.data.state==200){
          this.$router.push("/order/payorder-method");
        }else{
          Dialog.alert({
            title: '注意',
            message: '订单添加失败，请重试',
          }).then(() => {
            // on close
          });
        }
      });
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

/** 订单基本信息样式 */
.orderinfo-panel {
  padding: 5px 15px;
}

.orderinfo-panel .row {
  padding: 5px;
}

.orderinfo-label {
  text-align: left;
}

.orderinfo-value {
  text-align: right;
  color: #666;
  font-size: 0.9em;
}
</style>
