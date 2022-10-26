<template>
  <div>
    <!-- 搜索框 -->
    <van-sticky>
      <van-search
        v-model="keyword"
        shape="round"
        placeholder="请输入搜索关键词"
        style="background-color: white"
        @search="loadSpuListBySearchKeyword()"
      >
        <van-icon
          name="arrow-left"
          slot="left"
          style="color: #fff; font-size: 1.2em; margin-right: 6px"
          @click="$router.go(-1)"
        />
      </van-search>
      <!-- 顶部滚动导航  -->

      <van-tabs v-if="spuList && spuList.length != 0">
        <van-tab title="综合"></van-tab>
        <van-tab title="销量"></van-tab>
        <van-tab title="价格"></van-tab>
        <van-tab title="筛选"></van-tab>
      </van-tabs>
    </van-sticky>
    <!-- 商品列表 -->
    <van-empty
      description="该类别下没有商品"
      v-if="spuList && spuList.length == 0"
    />
    <van-card
      v-for="(item, index) in spuList"
      :key="index"
      :price="item.listPrice"
      :desc="item.description"
      :title="item.title"
      :thumb="item.pictures ? item.pictures.split(',')[0] : 'nullpicture'"
      @click="$router.push(`/product/seckill-detail/${item.id}`)"
    >
      <template #tags>
        <van-count-down :time="item.time" style="display: inline-block">
          <template #default v-if="item.seckillState == 0">
            <span style="background:red; color: white; padding:3px; border-radius: 2px;">秒杀尚未开始</span>
          </template>
          <template #default="timeData"  v-else-if="item.seckillState == 1">
            <span class="block">{{ timeData.days }}</span>
            <span class="colon">天</span>
            &nbsp;
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
          <template #default v-else>
            <span style="background:red; color: white; padding:3px; border-radius: 2px;">秒杀已经结束</span>
          </template>
          
        </van-count-down>
      </template>
      <template #footer> </template>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "", // 绑定当前关键字
      spuList: [], // 保存当前spu列表
    };
  },

  mounted() {
    this.loadSeckillSpuList();
  },

  methods: {
    /**
     * 加载秒杀商品列表
     */
    loadSeckillSpuList() {
      this.$api.seckillApi
        .querySpuList({ page: 1, pageSize: 100 })
        .then((res) => {
          console.log("加载秒杀列表结果", res);
          res.data.data.list.forEach((item) => {
            let startMomentTime = this.moment(item.gmtStart, "YYYY-MM-DD HH:mm:ss").format("x"); 
            let endMomentTime = this.moment(item.gmtEnd, "YYYY-MM-DD HH:mm:ss").format("x"); 
            let nowTime = new Date().getTime();
            if(nowTime<startMomentTime){
              // 判断秒杀状态，  暂未开始
              item.seckillState = 0
            }else if(nowTime >= startMomentTime && nowTime <= endMomentTime){
              // 判断秒杀状态，  正在秒杀
              item.seckillState = 1
              item.time = endMomentTime - nowTime;
            }else if(nowTime > endMomentTime){
              // 判断秒杀状态，  秒杀结束
              item.seckillState = 2
            }
          });
          this.spuList = res.data.data.list;
        });
    },
  },
};
</script>

<style scoped>
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 5px;
}
.van-count-down {
  font-size: 0.8px;
}
</style>
