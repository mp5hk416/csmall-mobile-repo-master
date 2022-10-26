<template>
  <div>
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/home/index" icon="wap-home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item icon="send-gift"
        >逛逛</van-tabbar-item
      >
      <van-tabbar-item icon="chat"
        >消息</van-tabbar-item
      >
      <van-tabbar-item to="/product/cart" icon="shopping-cart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/home/platform" icon="manager"
        >我的酷鲨</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
