<template>
  <div
    class="container"
    :style="{
      'background-image': `url(${require('@/assets/login_background.jpg')})`,
    }"
  >
    <van-image
      class="logo"
      width="180px"
      height="180px"
      fit="contain"
      :src="require('../../assets/logo.png')"
    />

    <van-form v-show="showNamePwdForm">
      <van-field
        v-model="formInfo.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :left-icon="require('../../assets/u8.svg')"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="formInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :left-icon="require('../../assets/u9.svg')"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" @click="onSubmit"
          >提交</van-button
        >
      </div>
    </van-form>

    <van-form v-show="!showNamePwdForm">
      <van-field
        v-model="formMessageInfo.phoneNum"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :left-icon="require('../../assets/u8.svg')"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="formMessageInfo.validCode"
        center
        clearable
        label="验证码"
        placeholder="请输入文字"
        :left-icon="require('../../assets/u9.svg')"
      >
        <template #button>
          <img
            :src="imageCodeUrl"
            style="height: 40px; width: 100px;"
          />
        </template>
      </van-field>

      <van-field
        v-model="formMessageInfo.code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :left-icon="require('../../assets/u9.svg')"
      >
        <template #button>
          <van-button size="small" type="primary" @click.stop="sendSMS" :disabled="smsSendOK">{{smsBtnText}}</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" @click="onSubmitMessage"
          >提交</van-button
        >
      </div>
    </van-form>

    <van-row type="flex" justify="space-between">
      <van-col
        span="12"
        style="text-align: left"
        v-show="showNamePwdForm == false"
      >
        <span class="link" @click="showNamePwdForm = true">账号密码登录</span>
      </van-col>
      <van-col
        span="12"
        style="text-align: left"
        v-show="showNamePwdForm == true"
      >
        <span class="link" @click="showNamePwdForm = false"
          >手机验证码登录</span
        >
      </van-col>
      <van-col span="12" style="text-align: right">
        <router-link to="/user/registry" class="link">注册</router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {Toast} from 'vant'
import {mapMutations} from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      smsSendOK: false,
      smsBtnText: '发送验证码',
      smsTime: 60,
      showNamePwdForm: true,
      imageCodeUrl: '',
      
      formInfo:{
        username: "",
        password: ""
      },

      formMessageInfo:{
        phoneNum: "",
        validCode: "",
        validCodeId: "",
        code: ""
      },
    };
  },

  mounted(){
    this.$api.userApi.getImageCode().then(res=>{
        console.log(res)
        // 获取图片显示图片
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageCodeUrl = e.target.result
        }
        reader.readAsDataURL(res.data)
        // 获取消息头
        this.formMessageInfo.validCodeId = res.headers['valid-code']
      })
  },

  methods: {

    ...mapMutations(['saveToken', 'updateUserInfo']),

    sendSMS(){
      this.$api.userApi.sendSMS(this.formMessageInfo).then(res=>{
        console.log('发送验证码请求结果：', res)
        if(res.data.state==200){
          // 禁用按钮
          this.smsSendOK = true
          // 开启倒计时
          let t = window.setInterval(()=>{
            this.smsBtnText = this.smsTime-- + " 秒"
          }, 1000)
          window.setTimeout(()=>{
            clearInterval(t)
            this.smsSendOK = false
          }, 60*1000)
        }else  {
          this.smsBtnText = res.data.message
        }
      })
    },

    onSubmitMessage(){
      console.log("submitPhone", this.formMessageInfo);
      this.$api.userApi.loginByPhone(this.formMessageInfo).then(res=>{
        console.log('登录请求结果', res)
        if(res.data.state==200){
          // 获取token，并保存
          let tokenHeader = res.data.data.tokenHeader
          let tokenValue = res.data.data.tokenValue
          // 整合tokenInfo字符串 存入vuex
          let tokenInfo = {
            tokenHeader: 'Authorization',
            tokenValue: `${tokenHeader} ${tokenValue}`
          }
          console.log(this)
          this.saveToken(tokenInfo)
          // 发送请求，获取当前用户信息
          this.$api.userApi.getCurrentUser().then(res=>{
            console.log('获取当前用户', res)
            if(res.data.state==200){
              this.updateUserInfo(res.data.data)
              this.$router.push("/home/index");
            }
          })
        }else{
          Toast.fail(res.data.message);
        }
      })

    },

    onSubmit() {
      console.log("submit", this.formInfo);
      this.$api.userApi.login(this.formInfo).then(res=>{
        console.log('登录请求结果', res)
        if(res.data.state==200){
          // 获取token，并保存
          let tokenHeader = res.data.data.tokenHeader
          let tokenValue = res.data.data.tokenValue
          // 整合tokenInfo字符串 存入vuex
          let tokenInfo = {
            tokenHeader: 'Authorization',
            tokenValue: `${tokenHeader} ${tokenValue}`
          }
          console.log(this)
          this.saveToken(tokenInfo)
          // 发送请求，获取当前用户信息
          this.$api.userApi.getCurrentUser().then(res=>{
            console.log('获取当前用户', res)
            if(res.data.state==200){
              this.updateUserInfo(res.data.data)
              this.$router.push("/home/index");
            }
          })
        }else{
          Toast.fail(res.data.message);
        }
      })
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
