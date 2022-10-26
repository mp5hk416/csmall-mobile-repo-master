<template>
  <div style="padding-bottom: 100px">
    <!-- 顶部导航 -->
    <van-sticky>
      <van-nav-bar title="商品介绍" left-arrow @click-left="$router.go(-1)">
      </van-nav-bar>
      <!-- 顶部滚动导航  -->
      <van-tabs v-model="anchorPosition">
        <van-tab title="商品"></van-tab>
        <van-tab title="评价"></van-tab>
        <van-tab title="详情"></van-tab>
        <van-tab title="专题"></van-tab>
      </van-tabs>
    </van-sticky>

    <!-- 轮播图-->
    <van-swipe autoplay="0" class="swipe" id="anchor1">
      <van-swipe-item
        v-for="(item, index) in spuDetailInfo.pictureUrls"
        :key="index"
      >
        <van-image class="swipe-image" :src="item" fit="cover" />
      </van-swipe-item>
    </van-swipe>

    <van-notice-bar
      scrollable
      color="#f60"
      left-icon="info-o"
      background="#fff7cc"
      v-if="spuDetailInfo.seckillState==0"
    >
      秒杀尚未开始
    </van-notice-bar>
    <van-notice-bar
      scrollable
      color="#f60"
      left-icon="info-o"
      background="#fff7cc"
      v-if="spuDetailInfo.seckillState==2"
    >
      秒杀已经结束
    </van-notice-bar>
    <van-notice-bar
      scrollable
      color="#f60"
      left-icon="info-o"
      background="#fff7cc"
      v-if="spuDetailInfo.seckillState==1"
    >
      <van-count-down style="color:#f60;" :time="spuDetailInfo.time" format="秒杀抢购中，距离剩余结束还剩：DD天 HH时 mm分 ss秒" />
    </van-notice-bar>

    <div class="product-desc">
      <p class="price">￥{{ spuDetailInfo.seckillListPrice }}</p>
      <p class="title">
        <van-tag type="danger">自营</van-tag>
        {{ spuDetailInfo.title }}
      </p>
    </div>

    <van-cell title="选择规格" is-link @click="showSkuPanel = true" />
    <van-cell title="商品参数" is-link />

    <van-sku
      v-model="showSkuPanel"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      :show-add-cart-btn="false"
      @buy-clicked="handleBuyClicked"
    />

    <div class="divider"></div>

    <!-- 评价 -->
    <van-divider style="height: 10px" id="anchor2">用户评价</van-divider>
    <div class="comment-panel">
      <!-- 评论标题 -->
      <van-row>
        <van-col :span="12" style="text-align: left; font-size: 0.9em"
          >评价数量 2W+</van-col
        >
        <van-col :span="12" style="text-align: right; font-size: 0.9em"
          >好评率：99%</van-col
        >
      </van-row>
      <!-- 评论列表项 -->
      <div class="comment-item">
        <div class="userinfo">
          <van-image
            :src="require('@/assets/logo.png')"
            round
            width="50px"
            height="50px"
          />
          <div>
            <p class="nickname">****仔仔</p>
            <van-rate v-model="rate" size="0.9em" />
          </div>
        </div>
        <div class="content">
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
        </div>
        <van-divider />
      </div>

      <div class="comment-item">
        <div class="userinfo">
          <van-image
            :src="require('@/assets/logo.png')"
            round
            width="50px"
            height="50px"
          />
          <div>
            <p class="nickname">****仔仔</p>
            <van-rate v-model="rate" size="0.9em" />
          </div>
        </div>
        <div class="content">
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
        </div>
        <van-divider />
      </div>

      <div class="comment-item">
        <div class="userinfo">
          <van-image
            :src="require('@/assets/logo.png')"
            round
            width="50px"
            height="50px"
          />
          <div>
            <p class="nickname">****仔仔</p>
            <van-rate v-model="rate" size="0.9em" />
          </div>
        </div>
        <div class="content">
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
        </div>
        <van-divider />
      </div>

      <div class="comment-item">
        <div class="userinfo">
          <van-image
            :src="require('@/assets/logo.png')"
            round
            width="50px"
            height="50px"
          />
          <div>
            <p class="nickname">****仔仔</p>
            <van-rate v-model="rate" size="0.9em" />
          </div>
        </div>
        <div class="content">
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
          外观：高端大气上档次，低调奢华有内涵...
        </div>
        <van-divider />
      </div>
    </div>

    <div class="divider"></div>

    <!-- 商品详情 -->
    <van-divider style="height: 10px" id="anchor3">商品详情</van-divider>
    <div class="product-desc-panel" v-html="spuDetail"></div>

    <!-- 底部操作栏 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="$router.push('/product/cart')"
      />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />

      <van-goods-action-button
        type="danger"
        @click="showSkuPanel = true"
        :disabled="spuDetailInfo.seckillState!=1 ? true : false"
        :text="spuDetailInfo.seckillState==1?`立即购买`:(spuDetailInfo.seckillState==0?`秒杀尚未开始`:`秒杀已结束`)"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      id: this.$route.params.id,
      spuDetailInfo: {}, // 描述spu详情对象
      spuDetail: "", // 描述商品详情
      anchorPosition: 0,
      rate: 5, //评分
      showSkuPanel: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "0", // 是否必填 '1' 表示必填
            placeholder: "", // 可选值，占位文本
            extraDesc: "", // 可选值，附加描述文案
          },
        ],
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img01.yzcdn.cn/1.jpg",
      },
    };
  },

  mounted() {
    // 加载当前商品详情
    this.loadCurrentSpuDetail();
    // 加载当前商品描述
    this.loadCurrentSpuDesc();
    // 加载所有属性信息
    this.loadAllAttributesBySpuId();
    // 加载当前spuId下商品的所有sku列表
    this.loadSkuListBySpuId();
  },

  methods: {
    // 加载所有属性信息
    loadAllAttributesBySpuId() {
      this.$api.spuApi
        .queryAllAttributesBySpuId({ spuId: this.id })
        .then((res) => {
          console.log("加载秒杀SPU所有属性信息", res);
          // 将res.data.data 转为 vant所需要的结构 customTree
          // res.data.data: [{id:1, name:颜色, valueList:黑色,白色,金色}, {}, {}]
          // customTree: [{k_s:1, k:颜色, v:[{id:红色, name:红色}, {id:白色, name:白色}, {id:金色, name:金色}]}, {}, {}]
          let tree = [];
          res.data.data.forEach((item) => {
            tree.push({
              k_s: item.name,
              k: item.name,
              v: item.valueList.split(",").map((item) => {
                return { id: item, name: item };
              }),
            });
          });
          this.sku.tree = tree;
          console.log("自定义tree结构：", this.sku.tree);
        });
    },

    // 加载当前spuId下商品的所有sku列表
    loadSkuListBySpuId() {
      this.$api.seckillApi
        .querySkuListBySpuId({ spuId: this.id })
        .then((res) => {
          console.log("加载秒杀SPU现有sku列表", res);
          // 将res.data.data 转为 vant所需要的的结构 customList
          /* 整理数据格式
           * res.data.data: [
           *  {id:22, specifications:{attributes: [{id:1, name:'屏幕尺寸', value:'6.1寸'}], price:999, stock:100},{}...]
           *  customList: [{id:22, '1':'黑色', '3':'内存', price:999, stock_num:100}]
           */
          let customList = [];
          res.data.data.forEach((item) => {
            // 遍历规格参数，封装为属性，展开后存入r
            let attrs = {};
            item.specifications.forEach((attr) => {
              attrs[attr.attributeName] = attr.attributeValue;
            });
            // 封装结果对象
            let r = {
              id: item.id,
              price: item.seckillPrice * 100,
              stock_num: item.stock,
              title: item.title,
              pictures: item.pictures,
              data: JSON.stringify(item.specifications),
              url: item.url,
              ...attrs,
            };
            customList.push(r);
          });
          this.sku.list = customList;
          console.log("自定义list结构", customList);
        });
    },

    // 加载当前商品描述
    loadCurrentSpuDesc() {
      this.$api.seckillApi.queryDetailById({ spuId: this.id }).then((res) => {
        console.log("加载当前秒杀商品描述结果", res);
        this.spuDetail = res.data.data.detail;
      });
    },

    // 加载当前商品详情
    loadCurrentSpuDetail() {
      this.$api.seckillApi.queryById({ spuId: this.id }).then((res) => {
        console.log("加载当前秒杀商品详情结果", res);
        this.spuDetailInfo = res.data.data;
        
        let startMomentTime = this.moment(this.spuDetailInfo.gmtStart, "YYYY-MM-DD HH:mm:ss").format("x"); 
        let endMomentTime = this.moment(this.spuDetailInfo.gmtEnd, "YYYY-MM-DD HH:mm:ss").format("x"); 
        let nowTime = new Date().getTime();
        if(nowTime<startMomentTime){
          // 判断秒杀状态，  暂未开始
          this.spuDetailInfo.seckillState = 0
        }else if(nowTime >= startMomentTime && nowTime <= endMomentTime){
          // 判断秒杀状态，  正在秒杀
          this.spuDetailInfo.seckillState = 1
          this.spuDetailInfo.time = endMomentTime - nowTime;
        }else if(nowTime > endMomentTime){
          // 判断秒杀状态，  秒杀结束
          this.spuDetailInfo.seckillState = 2
        }

        this.spuDetailInfo.pictureUrls = this.spuDetailInfo.pictures
          ? this.spuDetailInfo.pictures.split(",")
          : [];
        // 加载规格默认数据
        this.sku.price = this.spuDetailInfo.seckillListPrice;
      });
    },

    handleBuyClicked(skuData) {
      console.log("点击了购买", skuData);
      let skuComb = skuData.selectedSkuComb;
      // 发送请求添加购物车
      let params = {
        mainPicture: skuComb.pictures
          ? skuComb.pictures[0]
          : "/null",
        price: skuComb.price / 100,
        quantity: skuData.selectedNum,
        skuId: skuComb.id,
        title: skuComb.title,
        spuId: this.id,
      };
      // 整理当前选中sku的specifications字符串到params.data属性中
      this.sku.list.forEach((item) => {
        if (item.id == params.skuId) {
          params.data = item.data;
          params.randCode = this.spuDetailInfo.url;
        }
      });
      console.log("提交购买", params);
      // 将选择的秒杀sku信息存入vuex
      this.$store.commit("saveSeckillSkuInfo", params);
      this.$router.push("/order/seckill-order-confirm");
    },
    handleAddCartClicked(skuData) {
      console.log("点击了添加购物车", skuData);
    },
  },

  watch: {
    anchorPosition(newval, oldval) {
      if (newval == 0) {
        document.getElementById("anchor1").scrollIntoView();
      }
      if (newval == 1) {
        document.getElementById("anchor2").scrollIntoView();
      }
      if (newval == 2) {
        document.getElementById("anchor3").scrollIntoView();
      }
    },
  },
};
</script>

<style scoped>
/** 轮播图样式 */
.swipe {
  width: 100vw;
  height: 60vw;
}
.swipe-image {
  width: 100%;
  height: 100%;
}
/** 商品描述样式 */
.product-desc {
  padding: 8px;
}
.product-desc .price {
  color: red;
  font-size: 1.4em;
}
.product-desc .title {
  padding: 5px;
  font-size: 0.9em;
}

/** 自定义分割线 */
.divider {
  height: 20px;
  background: #eee;
}

/** 用户评论 */
.comment-panel {
  padding: 10px;
}

.comment-panel .comment-item .userinfo {
  margin-top: 20px;
  display: flex;
}

.comment-panel .comment-item .content {
  font-size: 0.9em;
  padding: 5px;
}

/** 商品详情样式 */
.product-desc-panel >>> image {
  width: 100%;
}
</style>
