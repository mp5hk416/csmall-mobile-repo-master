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
      :price="seckillSkuInfo.price.toFixed(2)"
      :thumb="seckillSkuInfo.mainPicture"
      :num="seckillSkuInfo.quantity"
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
          {{ seckillSkuInfo.title}}
        </p>
      </template>
      <template #tags>
        <van-tag type="danger">秒杀</van-tag>
      </template>
    </van-card>

    <!-- 自定义分割线 -->
    <div class="divider"></div>
    <van-divider>基本信息</van-divider>

    <div class="orderinfo-panel">
      <van-row class="row">
        <van-col :span="8" class="orderinfo-label">商品总金额</van-col>
        <van-col :span="16" class="orderinfo-value"
          >￥ {{ orderPrice }}</van-col
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
    ...mapGetters({ seckillSkuInfo: "getSeckillSkuInfo" }),
    orderPrice() {
      return this.seckillSkuInfo.quantity * this.seckillSkuInfo.price * 100;
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
      params[`seckillOrderItemAddDTO.skuId`] = this.seckillSkuInfo.skuId;
      params[`seckillOrderItemAddDTO.barCode`] = "";
      params[`seckillOrderItemAddDTO.data`] = this.seckillSkuInfo.data
      params[`seckillOrderItemAddDTO.mainPicture`] = "mainpicture";
      params[`seckillOrderItemAddDTO.price`] = this.seckillSkuInfo.price;
      params[`seckillOrderItemAddDTO.quantity`] = this.seckillSkuInfo.quantity;
      params[`seckillOrderItemAddDTO.title`] = this.seckillSkuInfo.title;
      params.state = 0;
      params.url	= this.seckillSkuInfo.randCode
      params.spuId = this.seckillSkuInfo.spuId
      params.userId = LocalStorage.get(LocalStorage.KEY_USER_INFO).userId;
      console.log("下订单整理的参数", params);
      // 发送http请求，添加订单
      this.$api.seckillApi.saveSeckillOrder(params).then((res) => {
        console.log("秒杀订单添加结果", res);
        if(res.data.state==200){
          this.$router.push("/order/payorder-method");
        }else if(res.data.state==409){
          this.$toast.fail('每个用户针对同一件商品只能秒杀一次');
        }else {
          this.$toast.fail('系统异常，请稍后再试');
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
