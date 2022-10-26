<template>
  <div>
    <div
      class="background-top-cover"
      :style="{
        'background-image': `url(${require('@/assets/main_background.jpg')})`,
      }"
    ></div>

    <!-- 顶部导航 -->
    <van-search
      slot="title"
      v-model="keyword"
      placeholder="请输入搜索关键词"
      shape="round"
      input-align="center"
      @focus="$router.push('/product/list/search')"
    />

    <!-- 顶部导航 -->
    <div class="top-nav-panel">
      <van-row>
        <van-col span="5"> 潮牌推荐 </van-col>
        <van-col span="5"> 潮人装扮 </van-col>
        <van-col span="5"> 酷玩品鉴 </van-col>
        <van-col span="5"> 极限运动 </van-col>
        <van-col span="4">
          <router-link to="/product/category" style="color: #333">
            <van-icon name="bars" />
            分类
          </router-link>
        </van-col>
      </van-row>
    </div>

    <!-- 轮播图 -->
    <van-swipe class="swipe" :autoplay="3000" width="360" height="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" width="100%" fit="cover" />
      </van-swipe-item>
    </van-swipe>

    <!-- 格子导航 -->
    <van-grid :gutter="8" :border="false" class="grid">
      <van-grid-item
        :icon="require('@/assets/icon_ksbh.png')"
        text="酷鲨百货"
      />
      <van-grid-item
        :icon="require('@/assets/icon_ksdw.png')"
        text="酷鲨电玩"
      />
      <van-grid-item
        :icon="require('@/assets/icon_crfs.png')"
        text="潮人服饰"
      />
      <van-grid-item
        :icon="require('@/assets/icon_crbb.png')"
        text="潮人背包"
      />
      <van-grid-item
        :icon="require('@/assets/icon_crwj.png')"
        text="潮人玩具"
      />
      <van-grid-item
        :icon="require('@/assets/icon_crcw.png')"
        text="潮人宠物"
      />
      <van-grid-item
        :icon="require('@/assets/icon_ksjr.png')"
        text="酷鲨金融"
      />
      <van-grid-item
        :icon="require('@/assets/icon_kshy.png')"
        text="酷鲨会员"
      />
    </van-grid>

    <!-- 酷品秒杀 -->
    <div class="seckill-panel">
      <p class="title">
        酷品秒杀

        <b>距离结束</b>
        <van-count-down :time="time" style="display: inline-block">
          <template #default="timeData">
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </p>
      <van-row :gutter="5" 
          @click.native="$router.push('/product/seckill-list')">
        <van-col span="4" v-for="item in seckillSpuList" :key="item.id">
          <div class="product-item">
            <van-image
              class="img"
              :src="item.pictures ? item.pictures.split(',')[0] : ''"
            ></van-image>
            <p>￥279</p>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 心选 品牌 新品 直播 特价 -->
    <div class="nav-panel">
      <van-row>
        <van-col span="4">
          <div class="item">
            <p class="title">心选</p>
            <p class="sub-title">为你推荐</p>
          </div>
        </van-col>
        <van-col span="1"></van-col>
        <van-col span="4">
          <div class="item">
            <p class="title">品牌</p>
            <p class="sub-title">百亿补贴</p>
          </div>
        </van-col>
        <van-col span="1"></van-col>
        <van-col span="4">
          <div class="item">
            <p class="title">新品</p>
            <p class="sub-title">新品速达</p>
          </div>
        </van-col>
        <van-col span="1"></van-col>
        <van-col span="4">
          <div class="item">
            <p class="title">直播</p>
            <p class="sub-title">主播强推</p>
          </div>
        </van-col>
        <van-col span="1"></van-col>
        <van-col span="4">
          <div class="item">
            <p class="title">特价</p>
            <p class="sub-title">物美价廉</p>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 商品列表 -->
    <div class="product-panel">
      <van-grid :column-num="2" :border="false" class="product-grid">
        <van-grid-item>
          <div slot="default" class="product-grid-item">
            <van-image class="cover" src="/images/waijiaoguan.jpg" fit="cover">
            </van-image>
            <p class="title">
              外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.
            </p>
            <p class="price">￥399.00</p>
            <p class="comment">20万+评论</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="default" class="product-grid-item">
            <van-image class="cover" src="/images/waijiaoguan.jpg" fit="cover">
            </van-image>
            <p class="title">
              外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.
            </p>
            <p class="price">￥399.00</p>
            <p class="comment">20万+评论</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="default" class="product-grid-item">
            <van-image class="cover" src="/images/waijiaoguan.jpg" fit="cover">
            </van-image>
            <p class="title">
              外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.
            </p>
            <p class="price">￥399.00</p>
            <p class="comment">20万+评论</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="default" class="product-grid-item">
            <van-image class="cover" src="/images/waijiaoguan.jpg" fit="cover">
            </van-image>
            <p class="title">
              外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.
            </p>
            <p class="price">￥399.00</p>
            <p class="comment">20万+评论</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="default" class="product-grid-item">
            <van-image class="cover" src="/images/waijiaoguan.jpg" fit="cover">
            </van-image>
            <p class="title">
              外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.
            </p>
            <p class="price">￥399.00</p>
            <p class="comment">20万+评论</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="default" class="product-grid-item">
            <van-image class="cover" src="/images/waijiaoguan.jpg" fit="cover">
            </van-image>
            <p class="title">
              外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.
            </p>
            <p class="price">￥399.00</p>
            <p class="comment">20万+评论</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="default" class="product-grid-item">
            <van-image class="cover" src="/images/waijiaoguan.jpg" fit="cover">
            </van-image>
            <p class="title">
              外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.
            </p>
            <p class="price">￥399.00</p>
            <p class="comment">20万+评论</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="default" class="product-grid-item">
            <van-image class="cover" src="/images/waijiaoguan.jpg" fit="cover">
            </van-image>
            <p class="title">
              外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.
            </p>
            <p class="price">￥399.00</p>
            <p class="comment">20万+评论</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="default" class="product-grid-item">
            <van-image class="cover" src="/images/waijiaoguan.jpg" fit="cover">
            </van-image>
            <p class="title">
              外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.
            </p>
            <p class="price">￥399.00</p>
            <p class="comment">20万+评论</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="default" class="product-grid-item">
            <van-image class="cover" src="/images/waijiaoguan.jpg" fit="cover">
            </van-image>
            <p class="title">
              外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.
            </p>
            <p class="price">￥399.00</p>
            <p class="comment">20万+评论</p>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="default" class="product-grid-item">
            <van-image class="cover" src="/images/waijiaoguan.jpg" fit="cover">
            </van-image>
            <p class="title">
              外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.外交官拉杆箱.
            </p>
            <p class="price">￥399.00</p>
            <p class="comment">20万+评论</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 1000 * 60 * 60, // 倒计时总时长
      keyword: "", // 搜索框中的关键字
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],

      seckillSpuList: [], // 保存秒杀商品列表
    };
  },

  mounted() {
    // 加载秒杀列表
    this.loadSeckillSpuList();
  },

  methods: {
    /**
     * 加载秒杀商品列表
     */
    loadSeckillSpuList() {
      this.$api.seckillApi
        .querySpuList({ page: 1, pageSize: 6 })
        .then((res) => {
          console.log("加载秒杀列表结果", res);
          if(res.data.state==401){
            this.$router.push('/user/login')
          }else{
            this.seckillSpuList = res.data.data.list;
          }
        });
    },
  },
};
</script>
<style scoped>
/** 顶部背景封面样式 */
.background-top-cover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  z-index: -1;
  background-size: cover;
}

/** 顶部导航样式 */
.top-nav-panel {
  padding: 8px;
  font-size: 0.9em;
  text-align: center;
  color: white;
}

/** 轮播图样式 */
.swipe {
  position: relative;
  width: 360px;
  height: 150px;
  margin: 0px auto;
  border-radius: 10px;
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.3);
}

.grid {
  margin-top: 10px;
}

/** 网格导航样式 */
.grid >>> .van-grid-item__content {
  padding: 5px;
}

/** 秒杀面板样式 */
.seckill-panel {
  background-color: rgb(179, 224, 244);
  margin: 8px;
  border-radius: 10px;
  padding: 10px;
}
.seckill-panel b {
  font-size: 0.8em;
  font-weight: lighter;
  margin-left: 6px;
  margin-right: 4px;
}
.seckill-panel .title {
  font-size: 0.9em;
  font-weight: bold;
}

.seckill-panel .product-item {
  text-align: center;
  margin-top: 10px;
}
.seckill-panel .product-item .img {
  width: 100%;
  height: 56px;
}

.seckill-panel .product-item p {
  font-size: 0.8em;
  color: #ee0a24;
  margin-top: -4px;
}

.colon {
  display: inline-block;
  margin: 0 2px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 20px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 5px;
}

/** 中间导航面板样式 */
.nav-panel {
  background-color: rgb(179, 224, 244);
  margin: 8px;
  padding: 10px;
  text-align: center;
}

.nav-panel .title {
  font-size: 0.9em;
  font-weight: bold;
}

.nav-panel .sub-title {
  font-size: 0.8em;
  color: #666;
}

/** 商品列表样式 */
.product-panel {
  margin: 8px;
}

.product-grid-item {
  border-radius: 8px;
  overflow: hidden;
}

.product-grid >>> .van-grid-item__content {
  padding: 4px;
}

.product-grid-item .title {
  padding: 4px;
  font-size: 0.9em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: 2.3em;
}

.product-grid-item .price {
  font-size: 1.1em;
  color: #f00;
}

.product-grid-item .comment {
  font-size: 0.7em;
  color: #888;
  padding-left: 3px;
}
</style>
