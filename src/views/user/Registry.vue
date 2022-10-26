<template>
  <div class="container">
    <div
      class="bg"
      :style="{
        'background-image': `url(${require('@/assets/login_background.jpg')})`,
      }"
    ></div>
    <van-image
      class="logo"
      width="180px"
      height="180px"
      fit="contain"
      :src="require('../../assets/logo.png')"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="formInfo.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :left-icon="require('../../assets/u8.svg')"
        :rules="[
          { required: true, message: '用户名不能为空' },
          { pattern: /^[a-zA-Z]\w{4,16}$/, message: '用户名必须是由字母、数字组成的4~16字符' },
          { validator: checkUsernameDuplicate, message: '用户名已存在' },
        ]"
      />
      <van-field
        v-model="formInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :left-icon="require('../../assets/u9.svg')"
        :rules="[{ required: true, message: '密码不能为空' }]"
      />
      <van-field
        v-model="formInfo.ackPassword"
        type="password"
        name="重复密码"
        label="重复密码"
        placeholder="请再次密码"
        :left-icon="require('../../assets/u9.svg')"
        :rules="[
          { required: true, message: '请再次输入密码' },
          {
            validator: () => {
              return formInfo.password == formInfo.ackPassword;
            },
            message: '重复密码需要与密码输入一致',
          },
        ]"
      />
      <van-field
        v-model="formInfo.nickname"
        type="text"
        name="用户昵称"
        label="用户昵称"
        placeholder="请输入用户昵称"
        :left-icon="require('../../assets/u8.svg')"
        :rules="[{ required: true, message: '用户昵称不能为空' }]"
      />
      <van-field
        v-model="formInfo.email"
        type="text"
        name="邮箱"
        label="邮箱"
        placeholder="请输入邮箱"
        :left-icon="require('../../assets/u8.svg')"
        :rules="[
          { required: true, message: '请输入邮箱' },
          { validator: checkEmailDuplicate, message: '邮箱已存在' },
        ]"
      />
      <van-field
        v-model="formInfo.phone"
        type="text"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :left-icon="require('../../assets/u8.svg')"
        :rules="[
          { required: true, message: '请输入手机号' },
          { validator: checkPhoneDuplicate, message: '手机号已存在' },
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >快速注册</van-button
        >
      </div>
    </van-form>
    <van-row type="flex" justify="space-between">
      <van-col span="12" style="text-align: left"> </van-col>
      <van-col span="12" style="text-align: right">
        <router-link to="/user/login" class="link">直接登录</router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInfo: {}, // 用于描述表单信息
      timeoutTask: null, // 用于防抖任务
    };
  },
  methods: {
    onSubmit() {
      console.log("submit", this.formInfo);
      // 发送请求执行注册业务：
      this.$api.userApi.regist(this.formInfo).then((res) => {
        console.log("用户注册请求结果：", res);
        if (res.data.state == 200) {
          this.$router.replace("/user/login");
        }
      });
    },

    /**
     * 验证用户名是否重复
     */
    checkUsernameDuplicate() {
      return new Promise((resolve) => {
        // 发送请求执行验证是否重复业务：
        this.$api.userApi
          .checkValue({ type: "username", value: this.formInfo.username })
          .then((res) => {
            console.log(`验证重复用户名请求结果：`, res);
            if (res.data.state == 200) {
              resolve(true);
            } else {
              // 重复
              resolve(false);
            }
          });
      });
    },

    /**
     * 验证邮箱是否重复
     */
    checkEmailDuplicate() {
      return new Promise((resolve) => {
        // 发送请求执行验证是否重复业务：
        this.$api.userApi
          .checkValue({ type: "email", value: this.formInfo.email })
          .then((res) => {
            console.log(`验证重复邮箱请求结果：`, res);
            if (res.data.state == 200) {
              resolve(true);
            } else {
              // 重复
              resolve(false);
            }
          });
      });
    },

    /**
     * 验证手机号是否重复
     */
    checkPhoneDuplicate() {
      return new Promise((resolve) => {
        // 发送请求执行验证是否重复业务：
        this.$api.userApi
          .checkValue({ type: "phone", value: this.formInfo.phone })
          .then((res) => {
            console.log(`验证重复手机号请求结果：`, res);
            if (res.data.state == 200) {
              resolve(true);
            } else {
              // 重复
              resolve(false);
            }
          });
      });
    },
},
};
</script>

<style scoped>
/** 容器样式 */
.container {
  text-align: center;
  height: 100vh;
  background-size: cover;
}
.container .bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
}
.container .logo {
  margin-top: 60px;
}
.link {
  margin: 0px 20px;
  color: #333;
}
</style>

<style>
.van-field__left-icon .van-icon {
  margin-top: 4px !important;
}
</style>
