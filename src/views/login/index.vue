<template>
  <div>
    <el-card class="login-form-layout">
      <!-- 登录表单 -->
      <el-form 
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <!-- 图标 -->
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px; height: 56px; color: #409EEF"></svg-icon>
        </div>
        <!-- 标题 -->
        <h2 class="login-title color-main">mall-admin-web</h2>
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input 
            name="username"
            type="text"
            v-model="loginForm.username"
            autoComplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>              
            </span>
          </el-input>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input 
            name="password"
            :type="pwdType"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>              
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>              
            </span>
          </el-input>
        </el-form-item>
        <!-- 登录框 -->
        <el-form-item style="margin-bottom: 60px;">
          <el-button 
            style="width: 100%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'; // 正则验证
import login_center_bg from '@/assets/images/login_center_bg.png';

export default {
  name: 'login',
  data() {
    return {
      loginForm: { // 表单
        username: 'admin', // 用户名
        password: '123456', // 密码
      },
      loginRules: { // 验证规则
        username: [
          { required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (!isvalidUsername(value)) {
              callback(new Error('请输入正确的用户名'))
            } else {
              callback();
            }
          } }
        ],
        password: [
          { required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (value.length < 3) {
              callback(new Error('密码不能小于3位'))
            } else {
              callback();
            }
          } }
        ],
      },
      pwdType: 'password', // 密码输入框类型
      loading: false, // 按钮是否显示加载状态
      login_center_bg
    }
  },
  methods: {
    /**
     * 登录事件
     */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录请求开始
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false;
          })
        }
      })
    },
    /**
     * 是否可见密码
     */
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = '';
      } else {
        this.pwdType = 'password'
      }
    }
  },
}
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
</style>
