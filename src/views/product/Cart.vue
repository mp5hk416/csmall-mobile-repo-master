<template>
  <div style="padding-bottom: 60px">
    <van-sticky>
      <van-nav-bar title="购物车" left-arrow @click-left="$router.go(-1)">
      </van-nav-bar>
    </van-sticky>

    <van-checkbox-group
      v-model="checkedResult"
      ref="checkboxGroup"
      @change="handleChangeItemCheckboxStatus"
    >
      <van-swipe-cell v-for="(item, index) in cartInfo" :key="index">
        <div class="cart-item">
          <van-checkbox
            checked-color="#ee0a24"
            class="checkbox"
            :name="index"
          ></van-checkbox>

          <van-card class="card" :price="item.price" :thumb="item.mainPicture">
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
            <template #num>
              <van-stepper
                v-model="item.quantity"
                theme="round"
                button-size="22"
                disable-input
                @change="handleChangeStepper(index, item.quantity)"
              />
            </template>
          </van-card>
        </div>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            style="height: 100%"
            @click="deleteCartItem(index)"
          />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
    <van-submit-bar
      :price="totalPrice"
      button-text="确认订单"
      @submit="handleSubmit"
    >
      <van-checkbox
        checked-color="#ee0a24"
        v-model="checkedAll"
        @click="handleClickCheckAll"
        >全选</van-checkbox
      >
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      checkedAll: true, // 绑定是否全选
      checkedResult: [], // 当前选中的购物项的下标
    };
  },

  computed: {
    ...mapGetters({ cartInfo: "getCartInfo" }),

    /** 返回选中项的总价格 */
    totalPrice() {
      let total = 0;
      this.checkedResult.forEach((i) => {
        let item = this.cartInfo[i];
        total += item.price * item.quantity;
      });
      return total * 100;
    },
  },

  methods: {
    ...mapMutations([
      "addCartItem",
      "removeCartItem",
      "updateCartItemQuantity",
      "clearCart",
    ]),

    /**
     * 删除购物项
     */
    deleteCartItem(index) {
      let cartItem = this.cartInfo[index];
      // 发送请求删除购物项
      let params = { ids: cartItem.id };
      this.$api.orderApi.deleteCartItem(params).then((res) => {
        console.log("删除购物项结果", res);
        if (res.data.state == 200) {
          this.loadAllCartItems();
        }
      });
    },

    /**
     * 处理修改步进
     */
    handleChangeStepper(index, quantity) {
      // 发送请求，修改数量
      let params = { id: this.cartInfo[index].id, quantity };
      console.log(params);
      this.$api.orderApi.updateCartItemQuantity(params).then((res) => {
        console.log("修改数量结果", res);
      });
    },

    /**
     * 处理提交购物项
     */
    handleSubmit() {
      console.log("提交购物项");
      this.$router.push(`/order/order-confirm?indexs=${this.checkedResult}`);
    },

    /**
     * 处理更改item选中状态后的业务
     */
    handleChangeItemCheckboxStatus() {
      if (this.checkedResult.length == this.cartInfo.length) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    },

    /**
     * 处理点击全选后的业务
     */
    handleClickCheckAll() {
      this.$refs.checkboxGroup.toggleAll(this.checkedAll);
    },

    /** 加载所有购物项 */
    loadAllCartItems() {
      this.clearCart();
      this.$api.orderApi.queryCart().then((res) => {
        console.log("查询所有购物项结果", res);
        res.data.data.list.forEach((item) => {
          this.addCartItem(item);
        });
        // 默认全选所有购物项
        this.$refs.checkboxGroup.toggleAll(false);
      });
    },
  },

  mounted() {
    // 加载当前用户所有购物项
    this.loadAllCartItems();
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
}

.cart-item .checkbox {
  margin: 10px;
}

.cart-item .card {
  flex-grow: 1;
}
</style>
