<template>
  <div>
    <!-- 导航条 -->
    <van-nav-bar title="商品分类" left-arrow @click-left="$router.go(-1)" />

    <!-- TreeSelect -->
    <van-tree-select
      class="tree-select"
      height="wrap-content"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <div>
          <van-tabs v-if="items[active].childrens">
            <!-- 二级水平导航遍历 -->
            <van-tab
              v-for="level2Item in items[active].childrens"
              :title="level2Item.name"
              :key="level2Item.id"
            >
              <!-- 三级带图片导航 -->
              <van-grid
                :column-num="3"
                :border="false"
                clickable
                v-if="level2Item.childrens"
              >
                <van-grid-item
                  v-for="level3Item in level2Item.childrens"
                  :key="level3Item.id"
                  :icon="level3Item.icon"
                  :text="level3Item.name"
                  @click="handleClickGridItem(level3Item.id)"
                />
              </van-grid>
            </van-tab>
          </van-tabs>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      items: [{ text: "分组 1" }, { text: "分组 2" }],
    };
  },

  mounted() {
    // 加载三级类别列表
    this.loadCatList();
  },

  methods: {
    /** 加载三级类别列表 */
    loadCatList() {
      this.$api.categoryApi.queryAll().then((res) => {
        console.log("访问类别列表结果", res);
        res.data.data.categories.forEach((item) => {
          item.text = item.name;
        });
        this.items = res.data.data.categories;
      });
    },

    /**
     * 处理点击GridItem
     */
    handleClickGridItem(id) {
      this.$router.push(`/product/list/category/${id}`);
    },
  },
};
</script>

<style scoped>
/** 定义侧边导航样式 */
.tree-select {
  height: calc(100vh - 46px);
}

.van-tabs--line >>> .van-tabs__wrap {
  height: 30px;
}
</style>
