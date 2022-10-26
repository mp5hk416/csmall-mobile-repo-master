<template>
  <div style="padding-bottom: 100px">
    <!-- 顶部导航 -->
    <van-sticky>
      <van-nav-bar title="我的地址" left-arrow @click-left="$router.go(-1)">
      </van-nav-bar>
    </van-sticky>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
    };
  },
  methods: {
    onAdd() {
      Toast("新增地址");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
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

/** 订单列表项样式 */
.orderlist-item .title,
.orderlist-item .footer {
  margin-top: 15px;
  color: #666;
}
.orderlist-item .product-item {
  margin-bottom: 3px;
}
</style>
