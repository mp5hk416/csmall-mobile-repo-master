<template>
  <div>
    <!-- 搜索框 -->
    <van-sticky>
      <van-search
        v-model="keyword"
        shape="round"
        placeholder="请输入搜索关键词"
        style="background-color: white"
      >
        <van-icon
          name="arrow-left"
          slot="left"
          style="color: #fff; font-size: 1.2em; margin-right: 6px"
          @click="$router.go(-1)"
        />
      </van-search>
      <!-- 顶部滚动导航  -->
      <van-tabs>
        <van-tab title="综合"></van-tab>
        <van-tab title="销量"></van-tab>
        <van-tab title="价格"></van-tab>
        <van-tab title="筛选"></van-tab>
      </van-tabs>
    </van-sticky>
    <!-- 商品列表 -->
    <van-empty description="该类别下没有商品" v-if="spuList && spuList.length==0" />
    <van-card
      v-for="(item,index) in spuList"
      :key="index"
      :price="item.listPrice"
      :desc="item.description"
      :title="item.title"
      :thumb="item.pictures?item.pictures.split(',')[0]:'nullpicture'"
      @click="$router.push(`/product/detail/${item.id}`)"
    >
      <template #tags>
        <van-tag type="danger">自营</van-tag>
        &nbsp;
      </template>
      <template #footer> </template>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryId: this.$route.params.id, // 保存当前类别ID
      keyword: "", // 绑定搜索关键字
      spuList: [], // 保存当前spu列表
    };
  },

  mounted() {
    // 加载当前类别下的SPU列表
    this.loadSpuListByCategoryId();
  },

  methods: {
    /**
     * 通过CategoryId查询SPU列表
     */
    loadSpuListByCategoryId() {
      this.$api.spuApi
        .querySpuListByCategoryId({
          categoryId: this.categoryId,
          page: 1,
          pageSize: 10,
        })
        .then((res) => {
          console.log('加载SPU列表结果', res)
          this.spuList = res.data.data.list
        });
    },
  },
};
</script>
