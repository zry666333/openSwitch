<template>
<div>
  <div class="login" :style="img">
    <h2 class="title">欢迎登录PML网关安全系统</h2>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item prop="username">
      <el-input type="username" placeholder="请输入用户名" v-model="ruleForm.username" autocomplete="off">
      </el-input>
      <img class="user" src="../assets/images/user.svg" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" autocomplete="off"></el-input>
      <img class="password" src="../assets/images/password.svg" />
    </el-form-item>
    <div class="mark">
      <img class="checked" v-show="!ischecked" @click="check()" src="../assets/images/unchecked.svg">
      <img class="checked" v-show="ischecked" @click="check()" src="../assets/images/checked.svg">
      <span class="rememberPwd">记住密码自动登录</span>
      <span class="forgetPwd">忘记密码</span>
    </div>
    <el-form-item>
      <el-button  :style="imgButton" type="primary" @click="login('ruleForm')"></el-button>
    </el-form-item>
  </el-form>
  </div>
  <Particles></Particles>
</div>
</template>

<script>
import Particles from './particles/Particles'

export default {
  name: 'login',
  data () {
    return {
      img: {
        backgroundImage: 'url(' + require('../assets/images/block.png') + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      },
      imgButton: {
        backgroundImage: 'url(' + require('../assets/images/button.png') + ')'
      },
      ischecked: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    Particles
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.username === 'admin' && this.ruleForm.password === 'admin') {
            this.$store.commit('login', {username: this.ruleForm.username, password: this.ruleForm.password})
            this.$router.push('/home')
            this.$refs[formName].resetFields()
          } else {
            this.$message.warning('用户名或密码错误')
          }
        } else {
          return false
        }
      })
    },
    check () {
      this.ischecked = !this.ischecked
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  top:25%;
  left:10%;
  width: 550px;
  height: 580px;
  position:absolute;
  -webkit-background-size: cover;
  h2{
    margin-top: 10%;
    box-shadow: none;
    text-align: center;
    color: #42E3E1;
    font-size: 30px;
    background-color:transparent;
  }
  .el-form {
    margin-top: 34px;
    position:relative;
    padding-left:65px;
    padding-right:65px;
    .user,.password {
      left: 0px;
      position: absolute;
      top: 50%;
      margin-top: -31px;
    }
    .mark{
      position:relative;
      .rememberPwd{
        left:20px;
        color:#ffffff;
        position:absolute;
        font-size:14px;
      }
      .forgetPwd {
        font-size:14px;
        position:absolute;
        color: #ffffff;
        right:20px;
      }
    }
    /deep/ .el-form-item__content{
      margin-left:0px !important;
      margin-right:0px !important;
      .el-input__inner {
        color:#ffffff;
        padding-left:65px;
        border:2px solid #42E3E1;
        height:55px !important;
        background-color:transparent;
      }
    }
    .el-button{
      margin-top:43px;
      height: 55px;
      width: 100%;
      background-color: #42E3E1;
      border-radius: 7px;
      font-size: 20px;
      background-size: cover;
      background-position: center;
    }
  }
}
</style>

<style>
  input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-text-fill-color: #ededed !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    background-color:transparent;
    background-image: none;
    transition: background-color 50000s ease-in-out 0s;
  }
  input {
    background-color:transparent;
  }
</style>
